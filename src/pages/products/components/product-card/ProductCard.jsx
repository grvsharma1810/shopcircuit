import './product-card.css'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAxios } from '../../../../providers/AxiosProvider'
import { useData } from '../../../../providers/DataProvider'
import { useAuth } from '../../../../providers/AuthProvider'
import {
    ADD_TO_CART,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST
} from '../../../../providers/data-reducer'

const isProductInWishlist = (wishlist, product) => {
    return wishlist.findIndex(item => item.product._id === product._id) !== -1
}

const isProductInCart = (cart, product) => {
    return cart.findIndex(item => item.product._id === product._id) !== -1
}

const getWishlistItem = (product, wishlist) => {
    return wishlist.find(wishlistItem => wishlistItem.product._id === product._id)
}

const ProductCard = ({ product }) => {

    const {loggedInUser} = useAuth();
    const [isModifyingCart,setIsModifyingCart] = useState(false);
    const [isModifyingWishlist,setIsModifyingWishlist] = useState(false);
    
    const { postData, deleteData} = useAxios()    

    const { dataState, dataDispatch } = useData();    
    const wishlist = dataState.wishlist ? dataState.wishlist : [];
    const cart = dataState.cart ? dataState.cart : [];
    const { name, image, price, fastDelivery, inStock } = product;

    const handleAddToCart = async (product) => { 
        if(!loggedInUser){
            alert("Please Login");
            return;
        }
        setIsModifyingCart(true);                     
        const {cartItem} = await postData(`/users/${loggedInUser._id}/cart`,{ productId : product._id, quantity: 1 }) 
        console.log({cartItem})
        dataDispatch({ type: ADD_TO_CART, payload: { product: cartItem } })
        setIsModifyingCart(false);
    }

    const handleAddToWishlist = async (product) => {
        if(!loggedInUser){
            alert("Please Login");
            return;
        }
        setIsModifyingWishlist(true);
        const {wishlistItem} = await postData(`/users/${loggedInUser._id}/wishlist`,{ productId : product._id }) 
        dataDispatch({ type: ADD_TO_WISHLIST, payload: { product: wishlistItem } })
        setIsModifyingWishlist(false);
    }

    const handleRemoveFromWishlist = async (product) => {
        if(!loggedInUser){
            alert("Please Login");
            return;
        }
        const wishlistItem = getWishlistItem(product,wishlist);
        setIsModifyingWishlist(true);
        const {deleted} = await deleteData(`/users/${loggedInUser._id}/wishlist/${wishlistItem._id}`) 
        dataDispatch({ type: REMOVE_FROM_WISHLIST, payload: { product: wishlistItem } })
        setIsModifyingWishlist(false);
    }

    return (
        <>
            {
                inStock &&
                <div className="v-card mb-1">
                    <div className="card-img">
                        <img src={image} alt="card" />
                    </div>
                    {
                        !isProductInWishlist(wishlist, product) &&
                        <button className="btn-wishlist"
                            onClick={() => handleAddToWishlist(product)}
                            disabled={isModifyingWishlist}>
                            {!isModifyingWishlist && <i
                                className="fa fa-heart text-grey-400"
                                aria-hidden="true"></i>}
                            {isModifyingWishlist && <span
                                className="small-spinner"></span>}
                        </button>

                    }
                    {
                        isProductInWishlist(wishlist, product) &&
                        <button className="btn-wishlist"
                            onClick={() => handleRemoveFromWishlist(product)}
                            disabled={isModifyingWishlist}>
                            {!isModifyingWishlist && <i
                                className="fa fa-heart text-failure text-grey-400"
                                aria-hidden="true"></i>}
                            {isModifyingWishlist && <span
                                className="small-spinner"></span>}
                        </button>
                    }


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
                        <div>
                            {
                                !isProductInCart(cart, product) &&
                                <div>
                                    {
                                        isModifyingCart &&
                                        <button
                                            className="btn-solid primary card-btn"
                                            onClick={() => handleAddToCart(product)}
                                            disabled>
                                            <span className="small-spinner" style={{ display: 'inline-block' }}> </span>
                                        </button>
                                    }
                                    {
                                        !isModifyingCart &&
                                        <button
                                            className="btn-solid primary card-btn"
                                            onClick={() => handleAddToCart(product)}>
                                            Add To Cart
                                    </button>
                                    }
                                </div>
                            }
                            {
                                isProductInCart(cart, product) &&                                
                                <Link to="/cart">
                                    <button
                                        className="btn-solid bg-green-600 card-btn">
                                        <span>Go To Cart </span>
                                        <i className="fa fa-arrow-circle-right"></i>
                                    </button>
                                </Link>
                                
                            }
                        </div>
                    </div>
                </div>
            }

            {
                !inStock &&
                <div className="v-card">
                    <div className="card-img">
                        <img src={image} alt="card" />
                        <div className="bg-overlay">
                            <p className="text-size-2">OUT OF STOCK</p>
                        </div>
                    </div>
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
                        <button className="btn-solid primary card-btn" disabled>Add To Cart</button>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductCard;