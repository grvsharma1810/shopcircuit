import axios from "axios";
import { API_URL } from "../config"

export const deleteCartItem = async (cartId, cartItemId) => {
    try {
        const response = await axios.delete(`${API_URL}/cart/${cartId}/cart-items/${cartItemId}`)
        console.log(response)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return null;
        }
        alert("Something Went Wrong");
        return null;
    }
}