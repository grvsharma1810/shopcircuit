import { useEffect } from 'react'
import { useData } from '../../data-context'
import { useAxios } from '../../useAxios'
import './cart.css'
import { CartCard } from './components/cart-card/cart-card'
import { CartPrice } from './components/cart-price/cart-price';
import { SET_CART } from '../../data-reducer'
import Spinner from '../shared-components/spinner/spinner';

const Cart = () => {

    const { dataState, dataDispatch } = useData();
    const { getData: getCartData, isLoading } = useAxios('/api/cart');

    useEffect(() => {
        if (dataState.cart.length === 0) {
            (async function () {
                const cart = await getCartData();
                dataDispatch({ type: SET_CART, payload: { cart } })
            })()
        }
    }, [])

    const cart = dataState.cart ? dataState.cart : [];

    return (
        <div>
            {   isLoading && <Spinner />}
            {
                !isLoading && cart.length > 0 &&
                <div className="cart-container">
                    <div>
                        <h4 className="text-size-2 text-heading-medium mb-1">MY CART</h4>
                        <div className="flex cart">
                            {
                                cart.map((product) => {
                                    return (
                                        <CartCard product={product} key={product.id} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h4 className="text-size-2 text-heading-medium">PRICE DETAILS</h4>
                        <CartPrice />
                    </div>
                </div>
            }
            {
                !isLoading && cart.length === 0 &&
                <div className="flex h-center p-1">
                    <p className="text-heading-medium text-size-3">
                        Your Cart Is Empty. Please Add Something In Cart.
                    </p>
                </div>
            }
        </div>
    )
}

export default Cart;