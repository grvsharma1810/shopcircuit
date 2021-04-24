import './product-card.css'
import { Link } from 'react-router-dom'
import { useAxios } from '../../../../Providers/AxiosProvider'
import { useData } from '../../../../Providers/DataProvider'
import {
    ADD_TO_CART,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST
} from '../../../../Providers/data-reducer'

const isProductInWhiteList = (wishlist, product) => {
    return wishlist.findIndex(item => item.id === product.id) !== -1
}

const isProductInCart = (cart, product) => {
    return cart.findIndex(item => item.id === product.id) !== -1
}

const ProductCard = ({ product }) => {

    const { postData: postDataToCart, isLoading: isAddingToCart } = useAxios('/api/cart')
    const { postData: postDataToWishlist, isLoading: isAddingToWishlist } = useAxios('/api/wishlist')
    const { deleteData: removeDataFromWishlist, isLoading: isRemovingFromWishlist } = useAxios('/api/wishlist')

    const { dataState, dataDispatch } = useData();
    const wishlist = dataState.wishlist ? dataState.wishlist : [];
    const cart = dataState.cart ? dataState.cart : [];
    const { name, image, price, fastDelivery, inStock } = product;

    const handleAddToCart = async () => {
        await postDataToCart({ ...product, qty: 1 });
        dataDispatch({ type: ADD_TO_CART, payload: { product: { ...product, qty: 1 } } })
    }

    const handleAddToWishlist = async () => {
        await postDataToWishlist({ ...product });
        dataDispatch({ type: ADD_TO_WISHLIST, payload: { product: product } })
    }

    const handleRemoveFromWishlist = async () => {
        await removeDataFromWishlist({ ...product });
        dataDispatch({ type: REMOVE_FROM_WISHLIST, payload: { product: product } })
    }

    return (
        <>
            {
                inStock &&
                <div className="v-card">
                    <div className="card-img">
                        <img src={image} alt="card" />
                    </div>
                    {
                        !isProductInWhiteList(wishlist, product) &&
                        <button className="btn-wishlist"
                            onClick={() => handleAddToWishlist()}
                            disabled={isAddingToWishlist}>
                            {!isAddingToWishlist && <i
                                className="fa fa-heart text-grey-400"
                                aria-hidden="true"></i>}
                            {isAddingToWishlist && <span
                                className="small-spinner"></span>}
                        </button>

                    }
                    {
                        isProductInWhiteList(wishlist, product) &&
                        <button className="btn-wishlist"
                            onClick={() => handleRemoveFromWishlist()}
                            disabled={isRemovingFromWishlist}>
                            {!isRemovingFromWishlist && <i
                                className="fa fa-heart text-failure text-grey-400"
                                aria-hidden="true"></i>}
                            {isRemovingFromWishlist && <span
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
                                        isAddingToCart &&
                                        <button
                                            className="btn-solid primary card-btn"
                                            onClick={() => handleAddToCart()}
                                            disabled>
                                            <span className="small-spinner" style={{ display: 'inline-block' }}> </span>
                                        </button>
                                    }
                                    {
                                        !isAddingToCart &&
                                        <button
                                            className="btn-solid primary card-btn"
                                            onClick={() => handleAddToCart()}>
                                            Add To Cart
                                    </button>
                                    }
                                </div>
                            }
                            {
                                isProductInCart(cart, product) &&
                                <Link to='/cart'>
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