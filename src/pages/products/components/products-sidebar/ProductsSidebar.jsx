import React from "react";
import "./products-sidebar.css";
import {
    SORT_BY_PRICE,
    INCLUDE_OUT_OF_STOCK,
    ONLY_FAST_DELIVERY,
    HIGH_TO_LOW,
    LOW_TO_HIGH,
    CLEAR_FILTERS,
} from "../../product-reducer";
import { getLanguageLabel } from "../../../../utils/getLanguageLabel";
import { useLocalisation } from "../../../../providers/LocalisationProvider";
import { useProducts } from "../../ProductsProvider";
import { useLocation } from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ProductsSidebar = ({},ref) => {
    const {
        localisationState: { languageIndex },
    } = useLocalisation();
    const { productsState, productsDispatch } = useProducts();
    const query = useQuery();
    const categoryName = query.get("category");

    return (
        <div className="products-sidebar" ref={ref}>
            {categoryName && (
                <div className="mb-1">
                    <h5
                        className="text-size-2"
                        style={{ marginBottom: "0.5rem" }}
                    >
                        {getLanguageLabel("category", languageIndex)}
                    </h5>
                    <p>{categoryName}</p>
                </div>
            )}
            <h5 className="text-size-2 mb-1">
                {getLanguageLabel("sort_by", languageIndex)}
            </h5>
            <div className="form-row">
                <p className="form-check mb-1">
                    <input
                        type="radio"
                        id="highToLow"
                        name="sort"
                        value={HIGH_TO_LOW}
                        checked={
                            productsState[SORT_BY_PRICE] &&
                            productsState[SORT_BY_PRICE] === HIGH_TO_LOW
                        }
                        onChange={() =>
                            productsDispatch({
                                type: SORT_BY_PRICE,
                                payload: { value: HIGH_TO_LOW },
                            })
                        }
                    />
                    <label htmlFor="highToLow">
                        {" "}
                        {getLanguageLabel("price_high_to_low", languageIndex)}
                    </label>
                </p>
                <p className="form-check">
                    <input
                        type="radio"
                        id="lowToHigh"
                        name="sort"
                        value={LOW_TO_HIGH}
                        checked={
                            productsState[SORT_BY_PRICE] &&
                            productsState[SORT_BY_PRICE] === LOW_TO_HIGH
                        }
                        onChange={() =>
                            productsDispatch({
                                type: SORT_BY_PRICE,
                                payload: { value: LOW_TO_HIGH },
                            })
                        }
                    />
                    <label htmlFor="lowToHigh">
                        {" "}
                        {getLanguageLabel("price_low_to_high", languageIndex)}
                    </label>
                </p>
            </div>
            <h5 className="text-size-2 mb-1 mt-1">
                {getLanguageLabel("filters", languageIndex)}
            </h5>
            <div className="form-row">
                <p className="form-check mb-1">
                    <input
                        type="checkbox"
                        id="outofstock"
                        name="filter"
                        value="filterByOutOfStock"
                        checked={productsState[INCLUDE_OUT_OF_STOCK]}
                        onChange={() =>
                            productsDispatch({
                                type: INCLUDE_OUT_OF_STOCK,
                                payload: { value: {} },
                            })
                        }
                    />
                    <label htmlFor="outofstock">
                        {" "}
                        {getLanguageLabel(
                            "include_out_of_stock",
                            languageIndex
                        )}
                    </label>
                </p>
                <p className="form-check">
                    <input
                        type="checkbox"
                        id="fastdeliveryonly"
                        name="filter"
                        value="filterByFastDeliveryOnly"
                        checked={productsState[ONLY_FAST_DELIVERY]}
                        onChange={() =>
                            productsDispatch({
                                type: ONLY_FAST_DELIVERY,
                                payload: { value: {} },
                            })
                        }
                    />
                    <label htmlFor="fastdeliveryonly">
                        {" "}
                        {getLanguageLabel("fast_delivery_only", languageIndex)}
                    </label>
                </p>
            </div>
            <button
                className="btn-solid secondary"
                onClick={() =>
                    productsDispatch({
                        type: CLEAR_FILTERS,
                        payload: { value: {} },
                    })
                }
            >
                {" "}
                {getLanguageLabel("clear_filters", languageIndex)}
            </button>            
        </div>
    );
};

const forwardedRefSidebar = React.forwardRef(ProductsSidebar);

export default forwardedRefSidebar;
