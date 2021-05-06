import { createContext, useState, useContext, useEffect } from 'react';
import { useData } from './DataProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAxios } from './AxiosProvider'
import { SET_CART, SET_WISHLIST } from './data-reducer';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const { getData, postData } = useAxios()
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dataDispatch } = useData();
    const { state } = useLocation();
    const navigate = useNavigate();

    const getAndSetUserData = async (user) => {
        const { cart } = await getData(`/users/${user._id}/cart`);
        const { wishlist } = await getData(`/users/${user._id}/wishlist`);
        dataDispatch({ type: SET_CART, payload: { cart } })
        dataDispatch({ type: SET_WISHLIST, payload: { wishlist } })
    }

    useEffect(() => {
        (async function () {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                setIsLoading(true);
                setLoggedInUser(user);
                await getAndSetUserData(user);
                setIsLoading(false);
            }
        })()
    }, [])

    async function signup(userCredentials) {
        setIsLoading(true)
        const response = await postData(`/users`, userCredentials);
        if (response.status === 400) {
            alert(response.data.errorMessage)
        } else {
            const user = response.user;
            await getAndSetUserData(user);
            setLoggedInUser(user);
            localStorage.setItem("user", JSON.stringify({ _id: user._id, email: user.email, name: user.name }))
            navigate(state?.from ? state.from : "/");
        }
        setIsLoading(false);
    }


    async function login(email, password) {
        console.log({ email, password });
        setIsLoading(true);
        try {
            const { user } = await postData("/login", { email, password });
            await getAndSetUserData(user);
            setLoggedInUser(user);
            localStorage.setItem("user", JSON.stringify({ _id: user._id, email: user.email, name: user.name }))
            navigate(state?.from ? state.from : "/");
        } catch (error) {
            alert("Please enter a valid email and password");
        }
        setIsLoading(false);
    }

    const signOut = () => {
        setLoggedInUser(null);
        localStorage.removeItem("user")
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, login, signOut, signup, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)