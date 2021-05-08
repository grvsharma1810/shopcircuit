import "./view-product.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAxios } from "../../providers/AxiosProvider";
import { useAuth } from "../../providers/AuthProvider";
import { useData } from "../../providers/DataProvider";
import { ADD_TO_CART } from "../../providers/data-reducer";
import { getDiscountedPrice } from "../../utils";
import Spinner from "../shared-components/spinner/Spinner";
import StarIcon from '@material-ui/icons/Star';

const isProductInCart = (cart, product) => {
    console.log(cart, product);
    return cart.findIndex((item) => item.product._id === product._id) !== -1;
};

const ViewProduct = () => {
    const { productId } = useParams();
    const { loggedInUser } = useAuth();
    const { dataState, dataDispatch } = useData();
    const cart = dataState.cart ? dataState.cart : [];
    const { getData, postData } = useAxios();
    const [product, setProduct] = useState(null);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [isModifyingCart, setIsModifyingCart] = useState(false);

    const handleAddToCart = async (product) => {
        if (!loggedInUser) {
            alert("Please Login");
            return;
        }
        setIsModifyingCart(true);
        const { cartItem } = await postData(`/users/${loggedInUser._id}/cart`, {
            productId: product._id,
            quantity: 1,
        });
        console.log({ cartItem });
        dataDispatch({ type: ADD_TO_CART, payload: { product: cartItem } });
        setIsModifyingCart(false);
    };

    useEffect(() => {
        (async function () {
            const response = await getData(`/products/${productId}`);
            setProduct(response?.product);
            setIsProductLoading(false);
        })();
    }, [productId]);

    return (
        <>
            {isProductLoading ? (
                <Spinner />
            ) : (
                <div className="product-view">
                    <div
                        className="p-1"
                        style={{
                            borderRadius: "1rem",
                            border: "1px solid #D1D5DB",
                        }}
                    >
                        <img className="img" src={`${product.image}`} alt="" />
                    </div>
                    <div>
                        <div className="text-size-2">{product.name}</div>
                        <div
                            style={{
                                marginBottom: "0.5rem",
                                marginTop: "0.5rem",
                            }}
                        >
                            <span className="rating bg-green-600 mr-1">
                                <span>4.7 </span>
                                <StarIcon/>
                            </span>
                            {product.fastDelivery && (
                                <span
                                    className="badge-pill bg-green-100"
                                    style={{ display: "inline-block" }}
                                >
                                    Fast Delivery
                                </span>
                            )}
                        </div>
                        <div>
                            <span className="text-size-3 text-heading-bold mr-sm">
                                ₹{" "}
                                {getDiscountedPrice(
                                    product.price,
                                    product.discount
                                )}
                            </span>
                            {product.discount != 0 && (
                                <>
                                    <span
                                        className="mr-sm"
                                        style={{
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        ₹ {product.price}
                                    </span>

                                    <span className="text-success text-heading-bold">
                                        {product.discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="mb-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Provident doloremque quo a non, maxime itaque?
                            Expedita enim mollitia consequatur excepturi. Ipsa
                            ut illo doloribus aspernatur laborum. Ad cumque
                            totam nulla.
                        </div>
                        <>
                            {!product.inStock && (
                                <button
                                    className="btn-solid secondary w-100"
                                    disabled
                                >
                                    OUT OF STOCK
                                </button>
                            )}
                        </>
                        <>
                            {product.inStock &&
                                !isProductInCart(cart, product) && (
                                    <>
                                        {isModifyingCart && (
                                            <button
                                                className="btn-solid primary card-btn w-100"
                                                disabled
                                            >
                                                <div className="small-spinner"></div>
                                            </button>
                                        )}
                                        {!isModifyingCart && (
                                            <button
                                                className="btn-solid primary card-btn w-100"
                                                onClick={() =>
                                                    handleAddToCart(product)
                                                }
                                            >
                                                Add To Cart
                                            </button>
                                        )}
                                    </>
                                )}
                            {isProductInCart(cart, product) && (
                                <Link to="/cart">
                                    <button className="btn-solid bg-green-600 w-100">
                                        <span>Go To Cart </span>
                                    </button>
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewProduct;
