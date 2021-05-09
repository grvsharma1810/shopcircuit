import { useNavigate } from "react-router-dom";
import { useLocalisation } from "../../../providers/LocalisationProvider";
import { getLanguageLabel } from "../../../utils/getLanguageLabel";

export const CardImage = ({ image, inStock, _id }) => {
    const {
        localisationState: { languageIndex },
    } = useLocalisation();
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/products/${_id}`)} className="card-img">
            <img src={image} alt="card" />
            {!inStock && (
                <div className="bg-overlay">
                    <p className="text-size-2">
                        {getLanguageLabel("out_of_stock", languageIndex)}
                    </p>
                </div>
            )}
        </div>
    );
};
