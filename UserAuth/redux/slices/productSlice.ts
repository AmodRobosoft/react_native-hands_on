import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProduct } from "../services/productService";

interface ProductState {
  allProducts: any[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async ({ page = 1, limit = 10 }: { page: number; limit: number }) => {
    const response = await getAllProduct(page, limit);
    return response;
  },
);

const initialState: ProductState = {
  allProducts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  hasMore: true,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.allProducts = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

      const { products, total } = action.payload;
      const page = action.meta.arg.page;

      const updated =
        page === 1 ? products : [...state.allProducts, ...products];

      state.allProducts = updated;
      state.currentPage = page;
      state.total = total;
      state.hasMore = updated.length < total;
    });

    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch products";
    });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
