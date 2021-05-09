import { getDiscountedPrice } from "../../../utils/getDiscountedPrice";
import { getLanguageLabel } from "../../../utils/getLanguageLabel";
import { useLocalisation } from "../../../providers/LocalisationProvider";

export const Price = ({ price, discount }) => {
    const {
        localisationState: { languageIndex },
    } = useLocalisation();

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
                        {discount}% {getLanguageLabel("off", languageIndex)}
                    </span>
                </>
            )}
        </div>
    );
};
