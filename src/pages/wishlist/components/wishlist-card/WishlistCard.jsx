import {useState} from 'react';
import { REMOVE_FROM_WISHLIST } from '../../../../providers/data-reducer'
import { useData } from '../../../../providers/DataProvider'
import { useAxios } from '../../../../providers/AxiosProvider'
import {useAuth} from '../../../../providers/AuthProvider'

export const WishlistCard = ({ wishlistItem }) => {

    const { dataDispatch } = useData();
    const {loggedInUser} = useAuth();
    const [isDeletingWishlistItem, setisDeletingWishlistItem] = useState(false);    
    const product = wishlistItem.product;    
    const { name, image, price, fastDelivery } = product;
    const { deleteData, } = useAxios();

    const handleRemoveFromWishlist = async () => {
        setisDeletingWishlistItem(true);
        await deleteData(`/users/${loggedInUser._id}/wishlist/${wishlistItem._id}`);
        setisDeletingWishlistItem(false);
        dataDispatch({ type: REMOVE_FROM_WISHLIST, payload: { product: wishlistItem } }) 
    }   


    return (
        <div className="v-card mb-1">
            <div className="card-img">
                <img src={image} alt="card" />
            </div>
            <button className="btn-dismiss"
                onClick={() => handleRemoveFromWishlist()}
                disabled={isDeletingWishlistItem}>
                {!isDeletingWishlistItem && 
                    <i className="fa fa-trash text-failure text-size-1"></i>}
                {isDeletingWishlistItem && 
                    <div className="small-spinner"></div>}
            </button>  
            <div className="card-body bg-white">
                <h2 className="card-title">
                    {name}
                    <div className="flex flex-start">
                        {fastDelivery && <span className="badge-pill bg-green-100">Fast Delivery</span>}
                    </div>
                </h2>
                <div>
                    <span className="mr-sm">Rs. {price}</span>
                </div>                              
            </div>
        </div>
    )
}