import { useData } from '../../data-context'
import {
    INCREASE_QUANTITY_IN_CART,
    DECREASE_QUANTITY_IN_CART,
    REMOVE_FROM_CART
} from '../../data-reducer'


export const CartCard = ({ product }) => {

    const { dataDispatch } = useData();
    const { name, image, price, fastDelivery, qty } = product;

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
                        onClick={() => dataDispatch({ type: DECREASE_QUANTITY_IN_CART, payload: { product: product } })}
                        className="btn-ghost primary"
                        disabled={product.qty === 1}>-</button>
                    <span> {qty} </span>
                    <button
                        onClick={() => dataDispatch({ type: INCREASE_QUANTITY_IN_CART, payload: { product: product } })}
                        className="btn-ghost primary">+</button>
                    <button
                        onClick={() => dataDispatch({ type: REMOVE_FROM_CART, payload: { product: product } })}
                        className="btn-ghost primary">REMOVE</button>
                </div>
            </div>
        </div>
    )
}