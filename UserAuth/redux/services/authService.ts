import apiClient from "../api"
export const LoginUser = async (username: string, password: string) => {
   const response = await apiClient.post("/auth/login", {
      username,
      password,
   });
   return response.data;
}

export const getMe = async (accessToken:string|null) => { 
   const response = await apiClient.get("/auth/me", {
     headers: {
       Authorization: `Bearer ${accessToken}`,
     },
   });
   return response.data
}