import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.totalPrice += action.payload.price * action.payload.quantity;
      state.products.push(action.payload);
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
