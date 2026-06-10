import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMe, LoginUser } from "../services/authService";
import * as SecureStore from 'expo-secure-store';

interface User {
  userId: number;
  username: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  refreshToken: string | null;
  accessToken: string | null;
  error: string | null;
  isAuthenticated: boolean,
  profileData: any[]
}

export const AuthUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await LoginUser(username, password);
    return response;
  }
);

export const getAuthUser = createAsyncThunk(
  "auth/me",
  async (accessToken: string|null) => { 
    const response = await getMe(accessToken)
    return response;
  }
)

export const restoreToken = createAsyncThunk("auth/restore", async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  return { accessToken, refreshToken };
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("userId")
    SecureStore.deleteItemAsync("isAuthenticated");
    await SecureStore.deleteItemAsync("savedProfileData");
    return true;
  } catch (err: any) {
    console.error("logout error", err);
    return rejectWithValue(err.message || "Logout failed");
  }
});

const initialState: AuthState = {
  user: null,
  isLoading: false,
  refreshToken: null,
  accessToken: null,
  error: null,
  isAuthenticated: false,
  profileData:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AuthUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(AuthUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated=true
      state.error = null;
      SecureStore.setItemAsync("userId", String(action.payload.id));
      SecureStore.setItemAsync("accessToken", action.payload.accessToken);
      SecureStore.setItemAsync("refreshToken", action.payload.refreshToken);
      SecureStore.setItemAsync("isAuthenticated", "true");
    });
    builder.addCase(AuthUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Login failed";
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    
    builder.addCase(restoreToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = !!action.payload.accessToken;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.isAuthenticated=false
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Logout failed";
    });

    builder.addCase(getAuthUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getAuthUser.fulfilled, (state,action) => {
      state.profileData = action.payload
      state.isLoading = false
      state.error = null;
    })
     builder.addCase(getAuthUser.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.error.message || "enable to get profile details";
     });

  },
});

export default authSlice.reducer;