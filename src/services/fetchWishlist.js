import axios from "axios";
import { API_URL } from "../config"

export const fetchWishlist = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/wishlist?userId=${userId}`)
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