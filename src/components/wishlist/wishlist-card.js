import { REMOVE_FROM_WISHLIST } from '../../data-reducer'
import { useData } from '../../data-context'

export const WishlistCard = ({ product }) => {

    const { dataDispatch } = useData();
    const { name, image, price, fastDelivery } = product;

    return (
        <div className="v-card card-shadow">
            <img src={image} alt="card" className="card-img" />
            <div className="card-body bg-white">
                <h2 className="card-title">
                    {name}
                </h2>
                <div className="flex flex-row v-center">
                    <span className="mr-sm">Rs. {price}</span>
                    {fastDelivery && <span className="badge bg-green-100 border-1 border-green-800">Fast Delivery</span>}
                </div>
                <div>
                    <button
                        onClick={() => dataDispatch({ type: REMOVE_FROM_WISHLIST, payload: { product: product } })}
                        className="btn-ghost primary">REMOVE FROM WISHLIST</button>
                </div>
            </div>
        </div>
    )
}