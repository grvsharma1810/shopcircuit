import "./product-card.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../../../providers/AxiosProvider";
import { useData } from "../../../../providers/DataProvider";
import { useAuth } from "../../../../providers/AuthProvider";
import { getDiscountedPrice } from "../../../../utils";
import {
    ADD_TO_CART,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
} from "../../../../providers/data-reducer";

const isProductInWishlist = (wishlist, product) => {
    return (
        wishlist.findIndex((item) => item.product._id === product._id) !== -1
    );
};

const getWishlistItem = (product, wishlist) => {
    return wishlist.find(
        (wishlistItem) => wishlistItem.product._id === product._id
    );
};

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { loggedInUser } = useAuth();
    const [isModifyingWishlist, setIsModifyingWishlist] = useState(false);

    const { postData, deleteData } = useAxios();

    const { dataState, dataDispatch } = useData();
    const wishlist = dataState.wishlist ? dataState.wishlist : [];
    const { name, image, price, fastDelivery, inStock, discount } = product;

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
            {inStock && (
                <div
                    onClick={() => navigate(`${product._id}`)}
                    className="v-card mb-1"
                >
                    <div className="card-img">
                        <img src={image} alt="card" />
                    </div>
                    {!isProductInWishlist(wishlist, product) && (
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
                    {isProductInWishlist(wishlist, product) && (
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
                    )}

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

                                    <span className="text-success text-heading-bold">
                                        {discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!inStock && (
                <div
                    onClick={() => navigate(`${product._id}`)}
                    className="v-card mb-1"
                >
                    <div className="card-img">
                        <img src={image} alt="card" />
                        <div className="bg-overlay">
                            <p className="text-size-2">OUT OF STOCK</p>
                        </div>
                    </div>
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

                                    <span className="text-success text-heading-bold">
                                        {discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>                       
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
