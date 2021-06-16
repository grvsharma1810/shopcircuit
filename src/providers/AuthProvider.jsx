import { createContext, useState, useContext, useEffect } from "react";
import { useData } from "./DataProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { SET_CART, SET_WISHLIST } from "../reducers/data-reducer";
import { loginWithCredentials } from "../services/loginWithCredentials";
import { signupWithCredentials } from "../services/signupWithCredentials";
import { fetchCart } from "../services/fetchCart";
import { fetchWishlist } from "../services/fetchWishlist";
import { setupAuthHeaderForServiceCalls } from "../utils/setupAuthHeaderForServiceCalls";
import { setupAuthExceptionHandler } from "../utils/setupAuthExceptionHandler";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { dataDispatch } = useData();
	const { state } = useLocation();
	const navigate = useNavigate();

	const getAndSetUserData = async (user) => {
		console.log(user._id);
		const { cart } = await fetchCart(user._id);
		const { wishlist } = await fetchWishlist(user._id);
		dataDispatch({ type: SET_CART, payload: { cart: cart } });
		dataDispatch({
			type: SET_WISHLIST,
			payload: { wishlist: wishlist },
		});
	};

	useEffect(() => {
		(async function () {
			const localStorageData = JSON.parse(localStorage.getItem("user"));
			if (localStorageData) {
				setIsLoading(true);
				setLoggedInUser(localStorageData.user);
				setupAuthHeaderForServiceCalls(localStorageData.token);
				setupAuthExceptionHandler(signOut, navigate);
				await getAndSetUserData(localStorageData.user);
				setIsLoading(false);
			}
		})();
	}, []);

	async function signup(userCredentials) {
		setIsLoading(true);
		const data = await signupWithCredentials(userCredentials);
		if (data.success) {
			navigate("/login");
		}
		setIsLoading(false);
	}

	async function login(email, password) {
		setIsLoading(true);
		const { user, token } = await loginWithCredentials(email, password);
		setupAuthHeaderForServiceCalls(token);
		setupAuthExceptionHandler(signOut, navigate);
		await getAndSetUserData(user);
		setLoggedInUser(user);
		localStorage.setItem(
			"user",
			JSON.stringify({
				_id: user._id,
				email: user.email,
				name: user.name,
				token,
			})
		);
		navigate(state?.from ? state.from : "/");
		setIsLoading(false);
	}

	const signOut = () => {
		setLoggedInUser(null);
		localStorage.removeItem("user");
		setupAuthHeaderForServiceCalls(null);
		dataDispatch({ type: SET_CART, payload: { cart: null } });
		dataDispatch({
			type: SET_WISHLIST,
			payload: { wishlist: null },
		});
		navigate("/");
	};

	return (
		<AuthContext.Provider
			value={{ loggedInUser, login, signOut, signup, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
