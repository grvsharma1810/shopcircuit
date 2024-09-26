import { useState } from "react";
import { useData } from "../../../providers/DataProvider";
import { useAuth } from "../../../providers/AuthProvider";
import {
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST,
} from "../../../reducers/data-reducer";
import { getWishlistItem, isProductInWishlist } from "./ProductCard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { createWishlistItem } from "../../../services/createWishlistItem";
import { deleteWishlistItem } from "../../../services/deleteWishlistItem";

export const WishlistButton = ({ product }) => {
	const [isModifyingWishlist, setIsModifyingWishlist] = useState(false);
	const { loggedInUser } = useAuth();
	const { dataState, dataDispatch } = useData();
	const wishlistId = dataState?.wishlist?._id
		? dataState?.wishlist?._id
		: null;
	const wishlistItems = dataState?.wishlist?.wishlistItems
		? dataState?.wishlist?.wishlistItems
		: [];

	const handleAddToWishlist = async (product) => {
		if (!loggedInUser) {
			alert("Please Login");
			return;
		}
		setIsModifyingWishlist(true);
		const { wishlistItem } = await createWishlistItem(wishlistId, {
			product: product._id,
		});
		dataDispatch({
			type: ADD_TO_WISHLIST,
			payload: { wishlistItem },
		});
		setIsModifyingWishlist(false);
	};

	const handleRemoveFromWishlist = async (product) => {
		if (!loggedInUser) {
			alert("Please Login");
			return;
		}
		const wishlistItem = getWishlistItem(product, wishlistItems);
		setIsModifyingWishlist(true);
		await deleteWishlistItem(wishlistItem.wishlistId, wishlistItem._id);
		dataDispatch({
			type: REMOVE_FROM_WISHLIST,
			payload: { wishlistItem },
		});
		setIsModifyingWishlist(false);
	};

	return (
		<>
			{isProductInWishlist(wishlistItems, product) ? (
				<button
					className="btn-dismiss"
					onClick={() => handleRemoveFromWishlist(product)}
					disabled={isModifyingWishlist}
				>
					{!isModifyingWishlist && (
						<FavoriteIcon className="text-failure" />
					)}
					{isModifyingWishlist && (
						<span className="small-spinner"></span>
					)}
				</button>
			) : (
				<button
					className="btn-dismiss"
					onClick={() => handleAddToWishlist(product)}
					disabled={isModifyingWishlist}
				>
					{!isModifyingWishlist && (
						<FavoriteIcon className="text-grey-400" />
					)}
					{isModifyingWishlist && (
						<span className="small-spinner"></span>
					)}
				</button>
			)}
		</>
	);
};
