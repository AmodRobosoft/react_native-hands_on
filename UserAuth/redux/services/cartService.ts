import apiClient from "../api"

export const getCartByUser = async (id:string|null) => { 
    const response = await apiClient.get(`/carts/user/${id}`);
    return response.data
}