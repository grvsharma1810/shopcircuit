import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REMOVE_FROM_WISHLIST } from "../../../../reducers/data-reducer";
import { useData } from "../../../../providers/DataProvider";
import { Title } from "../../../shared-components/product-card/Title";
import { Price } from "../../../shared-components/product-card/Price";
import { CardImage } from "../../../shared-components/product-card/CardImage";
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteWishlistItem } from "../../../../services/deleteWishlistItem";

export const WishlistCard = ({ wishlistItem }) => {
    const navigate = useNavigate();
    const product = wishlistItem.product;
    const { name, image, price, fastDelivery, discount, inStock } = product;

    return (
        <div className="v-card mb-1">
            <CardImage image={image} inStock={inStock} _id={product._id} />
            <RemoveFromWishlistButton wishlistItem={wishlistItem} />
            <div
                onClick={() => navigate(`/products/${product._id}`)}
                className="card-body bg-white"
            >
                <Title name={name} fastDelivery={fastDelivery} />
                <Price price={price} discount={discount} />
            </div>
        </div>
    );
};

const RemoveFromWishlistButton = ({ wishlistItem }) => {
    const { dataDispatch } = useData();
    const [isDeletingWishlistItem, setisDeletingWishlistItem] = useState(false);

    const handleRemoveFromWishlist = async () => {
        setisDeletingWishlistItem(true);
        await deleteWishlistItem(wishlistItem.wishlistId,wishlistItem._id);        
        setisDeletingWishlistItem(false);
        dataDispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: { wishlistItem },
        });
    };

    return (
        <button
            className="btn-dismiss"
            onClick={() => handleRemoveFromWishlist()}
            disabled={isDeletingWishlistItem}
        >
            {!isDeletingWishlistItem && (
                <DeleteIcon className="text-failure"/>
            )}
            {isDeletingWishlistItem && <div className="small-spinner"></div>}
        </button>
    );
};
