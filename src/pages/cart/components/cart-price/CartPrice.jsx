import { useData } from "../../../../providers/DataProvider";
import { getLanguageLabel } from "../../../../utils/getLanguageLabel";
import { useLocalisation } from "../../../../providers/LocalisationProvider";

const calculateCartTotal = (cart) => {
	return cart.reduce((acc, curr) => {
		return acc + curr.product.price * curr.quantity;
	}, 0);
};

const calculateCartTotalDiscount = (cart) => {
	return cart.reduce((acc, curr) => {
		return (
			acc +
			(curr.product.discount
				? Math.ceil((curr.product.price * curr.product.discount) / 100)
				: 0) *
				curr.quantity
		);
	}, 0);
};

export const CartPrice = () => {
	const {
		localisationState: { languageIndex },
	} = useLocalisation();
	const { dataState } = useData();
	const cartItems = dataState?.cart?.cartItems;

	return (
		<div className="flex flex-column">
			<div className="mt-1 flex space-btw">
				<span>{getLanguageLabel("grand_total", languageIndex)}</span>
				<span>₹ {calculateCartTotal(cartItems)}</span>
			</div>
			<div className="mt-1 flex space-btw">
				<span>{getLanguageLabel("discount", languageIndex)}</span>
				<span className="text-success">
					- ₹ {calculateCartTotalDiscount(cartItems)}
				</span>
			</div>
			<div className="mt-1 flex space-btw">
				<span>
					{getLanguageLabel("delivery_charges", languageIndex)}
				</span>
				<span className="text-success">
					{getLanguageLabel("none", languageIndex)}
				</span>
			</div>
			<div className="text-size-2 text-heading-bold mt-1 flex space-btw">
				<span>{getLanguageLabel("total", languageIndex)}</span>
				<span>
					₹{" "}
					{calculateCartTotal(cartItems) -
						calculateCartTotalDiscount(cartItems)}
				</span>
			</div>
			<button className="btn-solid primary mt-1">
				{getLanguageLabel("proceed_to_checkout", languageIndex)}{" "}
				<span className="text-size-sm">(Coming Soon)</span>
			</button>
		</div>
	);
};
