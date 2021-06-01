import { useState } from "react";
import { updateCartItem } from "../../../../services/updateCartItem";
import { useData } from "../../../../providers/DataProvider";
import { useAuth } from "../../../../providers/AuthProvider";
import {
	INCREASE_QUANTITY_IN_CART,
	DECREASE_QUANTITY_IN_CART,
} from "../../../../reducers/data-reducer";

export const Quantity = ({ quantity, cartItem }) => {	
	const { dataDispatch } = useData();
	const { loggedInUser } = useAuth();

	const [isIncreasingCartItemQuantity, setIncreasingCartItemQuantity] =
		useState(false);
	const [isDecreasingCartItemQuantity, setDecreasingCartItemQuantity] =
		useState(false);

	const handleIncreasingCartItemQuantity = async () => {
		if (quantity === 5) {
			alert("Sorry, Quantity more than 5 is not allowed.");
		} else {
			setIncreasingCartItemQuantity(true);
			await updateCartItem(cartItem.cartId, cartItem._id, {
				quantity: quantity + 1,
			});			
			setIncreasingCartItemQuantity(false);
			dataDispatch({
				type: INCREASE_QUANTITY_IN_CART,
				payload: { cartItem },
			});
		}
	};

	const handleDecreasingCartItemQuantity = async () => {
		setDecreasingCartItemQuantity(true);
        await updateCartItem(cartItem.cartId, cartItem._id, {
            quantity: quantity - 1,
        });		
		setDecreasingCartItemQuantity(false);
		dataDispatch({
			type: DECREASE_QUANTITY_IN_CART,
			payload: { cartItem },
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
