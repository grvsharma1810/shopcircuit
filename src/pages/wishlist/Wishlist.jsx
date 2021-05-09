import "./wishlist.css";
import {getLanguageLabel} from "../../utils/getLanguageLabel"
import { useLocalisation } from "../../providers/LocalisationProvider";
import { useData } from "../../providers/DataProvider";
import { WishlistCard } from "./components/wishlist-card/WishlistCard";

const Wishlist = () => {
    const { dataState } = useData();
    const {localisationState: { languageIndex }} = useLocalisation();
    const wishlist = dataState.wishlist ? dataState.wishlist : [];

    return (
        <div>
            {wishlist.length > 0 && (
                <div className="wishlist-container">
                    <h4 className="text-size-2 text-heading-medium mb-1">
                        <span>{getLanguageLabel("my_wishlist",languageIndex)}</span>
                        <span>({wishlist.length})</span>
                    </h4>
                    <div className="flex">
                        {wishlist.map((wishlistItem) => {
                            return (
                                <WishlistCard
                                    wishlistItem={wishlistItem}
                                    key={wishlistItem._id}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
            {wishlist.length === 0 && (
                <div className="flex h-center p-1">
                    <p className="text-heading-medium text-size-3">
                    {getLanguageLabel("your_wishlist_is_empty",languageIndex)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
