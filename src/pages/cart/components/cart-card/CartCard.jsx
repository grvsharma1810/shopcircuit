import "./cart-card.css";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../shared-components/product-card/Title";
import { Price } from "../../../shared-components/product-card/Price";
import { CardImage } from "../../../shared-components/product-card/CardImage";
import { Quantity } from "./Quantity";
import { RemoveFromCartButton } from "./RemoveFromCartButton";

export const CartCard = ({ cartItem }) => {
    const navigate = useNavigate();
    const product = cartItem.product;
    const quantity = cartItem.quantity;
    const { name, image, price, fastDelivery, discount, inStock } = product;

    return (
        <div className="h-card">
            <CardImage image={image} inStock={inStock} _id={product._id} />
            <RemoveFromCartButton cartItem={cartItem} />
            <div
                onClick={() => navigate(`/products/${product._id}`)}
                className="card-body bg-white"
            >
                <Title name={name} fastDelivery={fastDelivery} />
                <Price price={price} discount={discount} />
                <Quantity quantity={quantity} cartItem={cartItem} />
            </div>
        </div>
    );
};
