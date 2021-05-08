import { getDiscountedPrice } from "../../../utils/getDiscountedPrice";

export const Price = ({ price, discount }) => {
    return (
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
    );
};
