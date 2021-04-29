import "./cart-card.css";
import { useState } from "react";
import { useAxios } from "../../../../providers/AxiosProvider";
import { useData } from "../../../../providers/DataProvider";
import { useAuth } from "../../../../providers/AuthProvider";
import { getDiscountedPrice } from "../../../../utils";
import {
    INCREASE_QUANTITY_IN_CART,
    DECREASE_QUANTITY_IN_CART,
    REMOVE_FROM_CART,
} from "../../../../providers/data-reducer";

export const CartCard = ({ cartItem }) => {
    const { dataDispatch } = useData();
    const { loggedInUser } = useAuth();
    const [isDeletingCartItem, setisDeletingCartItem] = useState(false);
    const [
        isIncreasingCartItemQuantity,
        setIncreasingCartItemQuantity,
    ] = useState(false);
    const [
        isDecreasingCartItemQuantity,
        setDecreasingCartItemQuantity,
    ] = useState(false);
    const product = cartItem.product;
    const quantity = cartItem.quantity;
    const { name, image, price, fastDelivery, discount } = product;
    const { deleteData, postData } = useAxios();

    const handleRemoveFromCart = async () => {
        setisDeletingCartItem(true);
        await deleteData(`/users/${loggedInUser._id}/cart/${cartItem._id}`);
        setisDeletingCartItem(false);
        dataDispatch({
            type: REMOVE_FROM_CART,
            payload: { product: cartItem },
        });
    };

    const handleIncreasingCartItemQuantity = async () => {
        if (quantity === 5) {
            alert("Sorry, Quantity more than 5 is not allowed.");
        } else {
            setIncreasingCartItemQuantity(true);
            await postData(`/users/${loggedInUser._id}/cart/${cartItem._id}`, {
                quantity: quantity + 1,
            });
            setIncreasingCartItemQuantity(false);
            dataDispatch({
                type: INCREASE_QUANTITY_IN_CART,
                payload: { product: cartItem },
            });
        }
    };

    const handleDecreasingCartItemQuantity = async () => {
        setDecreasingCartItemQuantity(true);
        await postData(`/users/${loggedInUser._id}/cart/${cartItem._id}`, {
            quantity: quantity - 1,
        });
        setDecreasingCartItemQuantity(false);
        dataDispatch({
            type: DECREASE_QUANTITY_IN_CART,
            payload: { product: cartItem },
        });
    };

    return (
        <div className="h-card">
            <div className="card-img">
                <img src={image} alt="card" />
            </div>
            <button
                className="btn-dismiss"
                onClick={() => handleRemoveFromCart()}
                disabled={isDeletingCartItem}
            >
                {!isDeletingCartItem && (
                    <i className="fa fa-trash text-failure text-size-1"></i>
                )}
                {isDeletingCartItem && <div className="small-spinner"></div>}
            </button>
            <div className="card-body bg-white">
                <h2 className="card-title">
                    {name}
                    <div className="flex flex-start">
                        {fastDelivery && (
                            <span className="badge-pill bg-green-100">
                                Fast Delivery
                            </span>
                        )}
                    </div>
                </h2>
                <div>
                    <span className="text-heading-bold mr-sm">
                        ₹ {getDiscountedPrice(price, discount)}
                    </span>
                    {discount != 0 && (
                        <>
                            <span
                                className="mr-sm"
                                style={{
                                    textDecoration: "line-through",
                                    fontSize: "0.8rem",
                                }}
                            >
                                ₹ {price}
                            </span>

                            <span
                                className="text-success text-heading-bold"
                                style={{
                                    textDecoration: "line-through",
                                    fontSize: "0.8rem",
                                }}
                            >
                                {discount}% OFF
                            </span>
                        </>
                    )}
                </div>
                <div>
                    <span>Quantity: </span>
                    <button
                        onClick={() => handleDecreasingCartItemQuantity()}
                        className="btn-ghost primary p-sm"
                        disabled={
                            quantity === 1 || isDecreasingCartItemQuantity
                        }
                    >
                        {!isDecreasingCartItemQuantity && <span>-</span>}
                        {isDecreasingCartItemQuantity && (
                            <div className="small-spinner"></div>
                        )}
                    </button>
                    <span> {quantity} </span>
                    <button
                        onClick={() => handleIncreasingCartItemQuantity()}
                        className="btn-ghost primary p-sm"
                        disabled={isIncreasingCartItemQuantity}
                    >
                        {!isIncreasingCartItemQuantity && <span>+</span>}
                        {isIncreasingCartItemQuantity && (
                            <div className="small-spinner"></div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
