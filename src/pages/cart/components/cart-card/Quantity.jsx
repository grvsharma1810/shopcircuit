import { useState } from "react";
import { useAxios } from "../../../../providers/AxiosProvider";
import { useData } from "../../../../providers/DataProvider";
import { useAuth } from "../../../../providers/AuthProvider";
import {
    INCREASE_QUANTITY_IN_CART,
    DECREASE_QUANTITY_IN_CART
} from "../../../../providers/data-reducer";

export const Quantity = ({ quantity, cartItem }) => {
    const { postData } = useAxios();
    const { dataDispatch } = useData();
    const { loggedInUser } = useAuth();

    const [
        isIncreasingCartItemQuantity,
        setIncreasingCartItemQuantity,
    ] = useState(false);
    const [
        isDecreasingCartItemQuantity,
        setDecreasingCartItemQuantity,
    ] = useState(false);

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
        <div>
            <button
                onClick={() => handleDecreasingCartItemQuantity()}
                className="btn-ghost primary p-1"
                disabled={quantity === 1 || isDecreasingCartItemQuantity}
            >
                {!isDecreasingCartItemQuantity && <span>-</span>}
                {isDecreasingCartItemQuantity && (
                    <div className="small-spinner"></div>
                )}
            </button>
            <span> {quantity} </span>
            <button
                onClick={() => handleIncreasingCartItemQuantity()}
                className="btn-ghost primary p-1"
                disabled={isIncreasingCartItemQuantity}
            >
                {!isIncreasingCartItemQuantity && <span>+</span>}
                {isIncreasingCartItemQuantity && (
                    <div className="small-spinner"></div>
                )}
            </button>
        </div>
    );
};
