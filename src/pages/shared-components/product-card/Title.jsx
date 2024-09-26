import { getLanguageLabel } from "../../../utils/getLanguageLabel";
import { useLocalisation } from "../../../providers/LocalisationProvider";

export const Title = ({ name, fastDelivery }) => {
    const {
        localisationState: { languageIndex },
    } = useLocalisation();

    return (
        <h2 className="card-title">
            {name}
            <div className="flex flex-start">
                {fastDelivery && (
                    <span className="badge-pill bg-green-100">
                        {getLanguageLabel("fast_delivery", languageIndex)}
                    </span>
                )}
            </div>
        </h2>
    );
};
