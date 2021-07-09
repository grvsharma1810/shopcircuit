import axios from "axios";
import { API_URL } from "../config"

export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/products/${productId}`)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response.data.message);
            return [];
        }
        alert("Something Went Wrong");
        return [];
    }
}