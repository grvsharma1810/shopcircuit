import "./view-product.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../providers/AxiosProvider";
import { getDiscountedPrice } from "../../utils";
import Spinner from "../shared-components/spinner/Spinner";

const ViewProduct = () => {
    const { productId } = useParams();
    const { getData } = useAxios();
    const [product, setProduct] = useState(null);
    const [isProductLoading, setIsProductLoading] = useState(true);

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
                    <img class="img" src={`${product.image}`} alt="" />
                    <div>
                        <div className="text-size-2">{product.name}</div>
                        <div style={{ marginBottom: "0.5rem" }}>
                            <span className="rating bg-green-600 mr-1">
                                <span>4.7 </span>
                                <i class="fa fa-star" aria-hidden="true"></i>
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
                        <button className="btn-solid primary w-100">
                            ADD TO CART
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewProduct;
