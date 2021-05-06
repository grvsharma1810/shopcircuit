import { useState } from "react";
import { useAxios } from "../../../providers/AxiosProvider";
import { useData } from "../../../providers/DataProvider";
import { useAuth } from "../../../providers/AuthProvider";
import {
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST
} from "../../../providers/data-reducer";
import { getWishlistItem, isProductInWishlist } from "./ProductCard";

export const WishlistButton = ({ product }) => {
    const [isModifyingWishlist, setIsModifyingWishlist] = useState(false);
    const { loggedInUser } = useAuth();
    const { postData, deleteData } = useAxios();
    const { dataState, dataDispatch } = useData();
    const wishlist = dataState.wishlist ? dataState.wishlist : [];

    const handleAddToWishlist = async (product) => {
        if (!loggedInUser) {
            alert("Please Login");
            return;
        }
        setIsModifyingWishlist(true);
        const { wishlistItem } = await postData(
            `/users/${loggedInUser._id}/wishlist`,
            {
                productId: product._id,
            }
        );
        dataDispatch({
            type: ADD_TO_WISHLIST,
            payload: { product: wishlistItem },
        });
        setIsModifyingWishlist(false);
    };

    const handleRemoveFromWishlist = async (product) => {
        if (!loggedInUser) {
            alert("Please Login");
            return;
        }
        const wishlistItem = getWishlistItem(product, wishlist);
        setIsModifyingWishlist(true);
        await deleteData(
            `/users/${loggedInUser._id}/wishlist/${wishlistItem._id}`
        );
        dataDispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: { product: wishlistItem },
        });
        setIsModifyingWishlist(false);
    };

    return (
        <>
            {isProductInWishlist(wishlist, product) ? (
                <button
                    className="btn-dismiss"
                    onClick={() => handleRemoveFromWishlist(product)}
                    disabled={isModifyingWishlist}
                >
                    {!isModifyingWishlist && (
                        <i
                            className="fa fa-heart text-failure text-grey-400"
                            aria-hidden="true"
                        ></i>
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
                        <i
                            className="fa fa-heart text-grey-400"
                            aria-hidden="true"
                        ></i>
                    )}
                    {isModifyingWishlist && (
                        <span className="small-spinner"></span>
                    )}
                </button>
            )}
        </>
    );
};
