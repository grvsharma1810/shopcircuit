import axios from "axios";
import { API_URL } from "../config"

export const deleteWishlistItem = async (wishlistId, wishlistItemId) => {
    try {
        const response = await axios.delete(`${API_URL}/wishlist/${wishlistId}/wishlist-items/${wishlistItemId}`)
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