import { useState } from "react";
import { useData } from "../../../../providers/DataProvider";
import { useAuth } from "../../../../providers/AuthProvider";
import { REMOVE_FROM_CART } from "../../../../reducers/data-reducer";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteCartItem } from "../../../../services/deleteCartItem";

export const RemoveFromCartButton = ({ cartItem }) => {
    const [isDeletingCartItem, setisDeletingCartItem] = useState(false);
    const { dataDispatch } = useData();
    const { loggedInUser } = useAuth();    

    const handleRemoveFromCart = async () => {
        setisDeletingCartItem(true);
        await deleteCartItem(cartItem.cartId,cartItem._id)        
        setisDeletingCartItem(false);
        dataDispatch({
            type: REMOVE_FROM_CART,
            payload: { cartItem },
        });
    };

    return (
        <button
            className="btn-dismiss"
            onClick={() => handleRemoveFromCart()}
            disabled={isDeletingCartItem}
        >
            {!isDeletingCartItem && (
                <DeleteIcon className="text-failure" />
            )}
            {isDeletingCartItem && <div className="small-spinner"></div>}
        </button>
    );
};
