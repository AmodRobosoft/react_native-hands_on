import apiClient from "../api";
import * as SecureStore from "expo-secure-store";
export const LoginUser = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const getMe = async (accessToken: string | null) => {
  const response = await apiClient.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const response = await apiClient.post("/auth/refresh", {
    refreshToken,
    expiresInMins: 30,
  });

  await SecureStore.setItemAsync("accessToken", response.data.accessToken);
  return response.data.accessToken;
};