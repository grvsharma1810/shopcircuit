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
                <div className="card card-shadow">
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
                            {
                                !isProductInCart(dataState.cart, product) && <button
                                    className="btn-solid primary"
                                    onClick={() => dataDispatch({ type: ADD_TO_CART, payload: { product: { ...product, qty: 1 } } })}>
                                    Add To Cart
                                </button>
                            }
                            {
                                isProductInCart(dataState.cart, product) &&
                                <Link to='/cart'>
                                    <button
                                        className="btn-solid bg-green-600">
                                        Go To Cart
                                    </button>
                                </Link>
                            }
                            {
                                !isProductInWhiteList(dataState.wishlist, product) &&
                                <i
                                    onClick={() => dataDispatch({ type: ADD_TO_WISHLIST, payload: { product: product } })}
                                    className="fa fa-heart text-grey-600 ml-sm text-size-2"
                                    aria-hidden="true"></i>
                            }
                            {
                                isProductInWhiteList(dataState.wishlist, product) &&
                                <i
                                    onClick={() => dataDispatch({ type: REMOVE_FROM_WISHLIST, payload: { product: product } })}
                                    className="fa fa-heart text-failure ml-sm text-size-2"
                                    aria-hidden="true"></i>
                            }
                        </div>
                    </div>
                </div>
            }
            {
                !inStock &&
                <div className="card card-shadow">
                    <div className="card-img-overlay">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoes.jpg" alt="card" className="card-img" />
                        <div className="bg-overlay">
                            <p className="text-size-3">OUT OF STOCK</p>
                        </div>
                    </div>
                    <div className="card-body bg-white">
                        <h2 className="card-title">
                            {name}
                        </h2>
                        <div className="flex flex-row v-center">
                            <span className="mr-sm">Rs. {price}</span>
                            {fastDelivery && <span className="badge bg-green-100 border-1 border-green-800">Fast Delivery</span>}
                        </div>
                        <button className="btn-solid primary" disabled>Add To Cart</button>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductCard;