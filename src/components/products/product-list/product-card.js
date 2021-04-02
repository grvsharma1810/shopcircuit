import './product-card.css'
import { Link } from 'react-router-dom'
import { useData } from '../../../data-context'
import {
    ADD_TO_CART,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST
} from '../../../data-reducer'

const isProductInWhiteList = (wishlist, product) => {
    return wishlist.findIndex(item => item.id === product.id) !== -1
}

const isProductInCart = (cart, product) => {
    return cart.findIndex(item => item.id === product.id) !== -1
}

const ProductCard = ({ product }) => {
    const { dataState, dataDispatch } = useData();
    const { name, image, price, fastDelivery, inStock } = product;
    return (
        <>
            {
                inStock &&
                <div className="v-card">
                    <img src={image} alt="card" className="card-img" />
                    {
                        !isProductInWhiteList(dataState.wishlist, product) &&
                        <div className="btn-wishlist">
                            <i
                                onClick={() => dataDispatch({ type: ADD_TO_WISHLIST, payload: { product: product } })}
                                className="fa fa-heart text-grey-400 text-size-2"
                                aria-hidden="true"></i>
                        </div>
                    }
                    {
                        isProductInWhiteList(dataState.wishlist, product) &&
                        <div className="btn-wishlist">
                            <i
                                onClick={() => dataDispatch({ type: REMOVE_FROM_WISHLIST, payload: { product: product } })}
                                className="fa fa-heart text-failure text-size-2"
                                aria-hidden="true"></i>
                        </div>
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
                                !isProductInCart(dataState.cart, product) && <button
                                    className="btn-solid primary card-btn"
                                    onClick={() => dataDispatch({ type: ADD_TO_CART, payload: { product: { ...product, qty: 1 } } })}>
                                    Add To Cart
                                </button>
                            }
                            {
                                isProductInCart(dataState.cart, product) &&
                                <Link to='/cart'>
                                    <button
                                        className="btn-solid bg-green-600 card-btn">
                                        Go To Cart
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            }
            {
                !inStock &&
                <div className="v-card card-shadow">
                    <div className="card-img-overlay">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoes.jpg" alt="card" className="card-img" />
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