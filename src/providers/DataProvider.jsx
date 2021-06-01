import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react";
import { dataReducer, SET_PRODUCTS } from "../reducers/data-reducer";
import { fetchProducts } from "../services/fetchProducts";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
	const [isInitialAppDataLoading, setIsInitialAppDataLoading] =
		useState(true);

	const [state, dispatch] = useReducer(dataReducer, {
		products: [],
		cart: null,
		wishlist: null,
	});

	useEffect(() => {
		(async function () {
			const { products } = await fetchProducts();
			console.log(products);
			dispatch({ type: SET_PRODUCTS, payload: { products } });
			setIsInitialAppDataLoading(false);
		})();
		// eslint-disable-next-line
	}, []);

	return (
		<DataContext.Provider
			value={{
				dataState: state,
				dataDispatch: dispatch,
				isInitialAppDataLoading,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => {
	return useContext(DataContext);
};
