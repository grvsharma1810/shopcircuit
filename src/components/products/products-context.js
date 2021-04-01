import { createContext, useContext, useReducer } from "react";
import {
    productsReducer,
    SORT_BY_PRICE,
    ONLY_FAST_DELIVERY,
    INCLUDE_OUT_OF_STOCK,
    SEARCH_INPUT
} from "./product-reducer";

const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, {
        [SORT_BY_PRICE]: null,
        [ONLY_FAST_DELIVERY]: false,
        [INCLUDE_OUT_OF_STOCK]: false,
        [SEARCH_INPUT] : ''
    });
    return (
        <ProductsContext.Provider value={{ productsState: state, productsDispatch: dispatch }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => {
    return useContext(ProductsContext);
}