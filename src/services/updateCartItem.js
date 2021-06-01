import axios from "axios";
import { API_URL } from "../config"

export const updateCartItem = async (cartId, cartItemId, requestBody) => {
    try {
        const response = await axios.post(`${API_URL}/cart/${cartId}/cart-items/${cartItemId}`, requestBody)
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