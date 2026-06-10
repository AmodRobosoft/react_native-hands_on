import apiClient from "../api";

export const getAllProduct = async (page: number = 1, limit: number = 10) => {
  const response = await apiClient.get(
    `/products?skip=${(page - 1) * limit}&limit=${limit}`,
  );
  return response.data;
};
