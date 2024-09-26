import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { CardImage } from "./CardImage";
import { Title } from "./Title";
import { Price } from "./Price";
import { WishlistButton } from "./WishlistButton";

export const isProductInWishlist = (wishlist, product) => {
    return (
        wishlist.findIndex((item) => item.product._id === product._id) !== -1
    );
};

export const getWishlistItem = (product, wishlist) => {
    return wishlist.find(
        (wishlistItem) => wishlistItem.product._id === product._id
    );
};

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { name, image, price, fastDelivery, inStock, discount } = product;

    return (
        <div className="v-card mb-1">
            <CardImage image={image} inStock={inStock} _id={product._id} />
            <WishlistButton product={product} />
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

export default ProductCard;
