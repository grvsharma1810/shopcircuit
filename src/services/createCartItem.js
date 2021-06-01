import axios from "axios";
import { API_URL } from "../config"

export const createCartItem = async (cartId, requestBody) => {
    try {
        const response = await axios.post(`${API_URL}/cart/${cartId}/cart-items/`, requestBody)
        console.log(response)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return [];
        }
        alert("Something Went Wrong");
        return [];
    }
}