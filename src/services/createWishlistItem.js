import axios from "axios";
import { API_URL } from "../config"

export const createWishlistItem = async (wishlistId, requestBody) => {
    try {
        const response = await axios.post(`${API_URL}/wishlist/${wishlistId}/wishlist-items/`, requestBody)
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