import { useState } from "react";
import { useAxios } from "../../../../providers/AxiosProvider";
import { useData } from "../../../../providers/DataProvider";
import { useAuth } from "../../../../providers/AuthProvider";
import { REMOVE_FROM_CART } from "../../../../providers/data-reducer";

export const RemoveFromCartButton = ({ cartItem }) => {
    const [isDeletingCartItem, setisDeletingCartItem] = useState(false);
    const { dataDispatch } = useData();
    const { loggedInUser } = useAuth();
    const { deleteData } = useAxios();

    const handleRemoveFromCart = async () => {
        setisDeletingCartItem(true);
        await deleteData(`/users/${loggedInUser._id}/cart/${cartItem._id}`);
        setisDeletingCartItem(false);
        dataDispatch({
            type: REMOVE_FROM_CART,
            payload: { product: cartItem },
        });
    };

    return (
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
    );
};
