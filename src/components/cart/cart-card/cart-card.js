import './cart-card.css';
import { useAxios } from "../../../useAxios"
import { useData } from '../../../data-context'
import {
    INCREASE_QUANTITY_IN_CART,
    DECREASE_QUANTITY_IN_CART,
    REMOVE_FROM_CART
} from '../../../data-reducer'


export const CartCard = ({ product }) => {

    const { dataDispatch } = useData();
    const { name, image, price, fastDelivery, qty } = product;
    const { deleteData: deleteDataFromCart, isLoading: isDeletingFromCart } = useAxios("/api/cart");

    const handleRemoveFromCart = async () => {
        await deleteDataFromCart({ ...product });
        dataDispatch({ type: REMOVE_FROM_CART, payload: { product: product } })
    }


    return (
        <div className="v-card">
            <img src={image} alt="card" className="card-img" />
            <div className="card-body bg-white">
                <h2 className="card-title">
                    {name}
                </h2>
                <div className="flex flex-row v-center">
                    <span className="mr-sm">Rs. {price}</span>
                    {fastDelivery && <span className="badge bg-green-100 border-1 border-green-800">Fast Delivery</span>}
                </div>
                <button className="btn-wishlist"
                    onClick={() => handleRemoveFromCart()}
                    disabled={isDeletingFromCart}>
                    {!isDeletingFromCart && <i
                        className="fa fa-trash text-failure text-size-1"
                        aria-hidden="true"></i>}
                    {isDeletingFromCart && <span
                        className="small-spinner"></span>}
                </button>
                <div>

                    <span>Quantity: </span>
                    <button
                        onClick={() => dataDispatch({ type: DECREASE_QUANTITY_IN_CART, payload: { product: product } })}
                        className="btn-ghost primary p-sm"
                        disabled={product.qty === 1}>-</button>
                    <span> {qty} </span>
                    <button
                        onClick={() => dataDispatch({ type: INCREASE_QUANTITY_IN_CART, payload: { product: product } })}
                        className="btn-ghost primary p-sm">+</button>

                </div>
            </div>
        </div>
    )
}