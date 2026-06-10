import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartByUser } from "../services/cartService";

export const userCart = createAsyncThunk(
    "user/cart",
    async (id:string|null) => { 
        const response = await getCartByUser(id)
        return response;
    }
)
interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

interface cartSate {
  isLoading: boolean;
  error: string | null;
  cartData: {
    carts: Cart[];
  } | null;
}

const initialState: cartSate = {
    isLoading:false,
    error: null,
    cartData:null
} 

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(userCart.pending, (state) => { 
            state.isLoading = true
        })
        builder.addCase(userCart.fulfilled, (state,action) => { 
            state.cartData = action.payload
            state.isLoading = false
        })
       builder.addCase(userCart.rejected, (state, action) => {
             state.isLoading = false;
             state.error = action.error.message || "failed to get cart details";
           });
    }
});

export default cartSlice.reducer