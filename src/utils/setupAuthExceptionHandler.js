import axios from "axios";

export const setupAuthExceptionHandler = (signOutUser, navigate) => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === UNAUTHORIZED) {
                console.log("here");
                signOutUser();
                navigate("login");
            }
            return Promise.reject(error);
        }
    );
}