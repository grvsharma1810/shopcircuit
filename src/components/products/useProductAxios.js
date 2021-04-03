import axios from "axios";
import { useState } from "react";
// import { errorToast, successToast } from "./components/toasts";

const productURL = "api/productItems";

export const useProductAxios = () => {
    const [isLoading, setIsLoading] = useState(false);

    async function getData() {
        try {
            setIsLoading(true);
            const { data } = await axios.get(productURL);
            return data.productItems;
        } catch (err) {
            setIsLoading(false);
            alert("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, getData };
};