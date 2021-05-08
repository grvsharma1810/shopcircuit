import { useData } from "../../../../providers/DataProvider";
import { getDiscountedPrice } from "../../../../utils/getDiscountedPrice";

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
    const { dataState } = useData();
    const cart = dataState.cart;

    return (
        <div className="flex flex-column">
            <div className="mt-1 flex space-btw">
                <span>Grand Total</span>
                <span>₹ {calculateCartTotal(cart)}</span>
            </div>
            <div className="mt-1 flex space-btw">
                <span>Discount</span>
                <span className="text-success">
                    - ₹ {calculateCartTotalDiscount(cart)}
                </span>
            </div>
            <div className="mt-1 flex space-btw">
                <span>Delivery Charges</span>
                <span className="text-success">NONE</span>
            </div>
            <div className="text-size-2 text-heading-bold mt-1 flex space-btw">
                <span>Total</span>
                <span>
                ₹ {calculateCartTotal(cart) -
                        calculateCartTotalDiscount(cart)}
                </span>
            </div>
            <button className="btn-solid primary mt-1">
                Proceed To Checkout{" "}
                <span className="text-size-sm">(Coming Soon)</span>
            </button>
        </div>
    );
};
