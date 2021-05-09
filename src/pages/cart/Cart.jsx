import "./cart.css";
import { useData } from "../../providers/DataProvider";
import { CartCard } from "./components/cart-card/CartCard";
import { CartPrice } from "./components/cart-price/CartPrice";
import { useLocalisation } from "../../providers/LocalisationProvider";
import { getLanguageLabel } from "../../utils/getLanguageLabel";

const Cart = () => {
    const { dataState } = useData();
    const {
        localisationState: { languageIndex },
    } = useLocalisation();
    console.log({ languageIndex });
    const cart = dataState.cart ? dataState.cart : [];

    return (
        <div>
            {cart.length > 0 && (
                <div className="cart-container">
                    <div>
                        <h4 className="text-size-2 text-heading-medium mb-1">
                            <span>
                                {getLanguageLabel("my_cart", languageIndex)}{" "}
                            </span>
                            <span>({cart.length})</span>
                        </h4>
                        <div className="flex flex-column flex-gap-1">
                            {cart.map((cartItem) => {
                                return (
                                    <CartCard
                                        cartItem={cartItem}
                                        key={cartItem._id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="cart-price">
                        <h4 className="text-size-2 text-heading-medium">
                            {getLanguageLabel("price_details", languageIndex)}
                        </h4>
                        <CartPrice />
                    </div>
                </div>
            )}
            {cart.length === 0 && (
                <div className="flex h-center p-1">
                    <p className="text-heading-medium text-size-3">
                        {getLanguageLabel("your_cart_is_empty", languageIndex)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Cart;
