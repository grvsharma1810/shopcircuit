import { useData } from '../../data-context'
import './cart.css'
import { CartCard } from './cart-card/cart-card';
import { CartPrice } from './cart-price/cart-price';

const Cart = () => {
    const { dataState } = useData();
    const cart = dataState.cart;
    console.log({ cart });
    return (
        <div>
            {
                cart.length > 0 &&
                <div className="cart-container">
                    <div>
                        <h4 className="text-size-2 text-heading-medium">MY CART</h4>
                        <div className="flex flex-row h-center p-2">
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
                cart.length === 0 &&
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