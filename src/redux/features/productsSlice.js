import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../utilities/requestMethods";

const initialState = {
  items: [],
  status: null,
};

export const productsFetch = createAsyncThunk("products/productsFetch", async (category, { rejectWithValue }) => {
  try {
    const res = await publicRequest.get(`products?category=${category}`);
    console.log(res.data);
    return res?.data;
  } catch (err) {
    return rejectWithValue("Error fetching products");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "loading";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default productsSlice.reducer;
