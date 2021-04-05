import { REMOVE_FROM_WISHLIST } from '../../../data-reducer'
import { useData } from '../../../data-context'
import { useAxios } from '../../../useAxios'

export const WishlistCard = ({ product }) => {

    const { dataDispatch } = useData();
    const { name, image, price, fastDelivery } = product;
    const { deleteData: removeDataFromWishlist, isLoading: isRemovingFromWishlist } = useAxios('/api/wishlist')

    const handleRemoveFromWishlist = async () => {
        await removeDataFromWishlist({ ...product });
        dataDispatch({ type: REMOVE_FROM_WISHLIST, payload: { product: product } })
    }

    return (
        <div className="v-card">
            <div className="card-img">
                <img src={image} alt="card" />
            </div>            
            <button className="btn-wishlist"
                onClick={() => handleRemoveFromWishlist()}
                disabled={isRemovingFromWishlist}>
                {!isRemovingFromWishlist && <i
                    className="fa fa-trash text-failure text-size-1"
                    aria-hidden="true"></i>}
                {isRemovingFromWishlist && <span
                    className="small-spinner"></span>}
            </button>
            <div className="card-body bg-white">
                <h2 className="card-title">
                    {name}
                    <div className="flex flex-start">
                        {fastDelivery && <span className="badge bg-green-100 border-1 border-green-800">Fast Delivery</span>}
                    </div>
                </h2>
                <div>
                    <span className="mr-sm">Rs. {price}</span>
                </div>
            </div>
        </div>
    )
}