import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartCreated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const itemIndex = state.products.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        // if item already in array cart i.e in cart[0]
        state.products[itemIndex].quantity += 1;
        state.products[itemIndex].color = action.payload.color;
        state.products[itemIndex].size = action.payload.size;
      } else {
        // if item not exist in cart, no element array matches with item id
        // const newItem = { ...action.payload, quantity: 1, cartColor: action.payload.color, cartSisze: action.payload.size };
        const newItem = { ...action.payload, quantity: 1 };
        state.products.push(newItem);
      }
    },
    increaseCart: (state, action) => {
      const itemIndex = state.products.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.products[itemIndex].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const willRemoved = state.products.filter((item) => item._id !== action.payload._id);
      state.products = willRemoved;
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.products.findIndex((item) => item._id === action.payload._id);
      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
      } else if (state.products[itemIndex].quantity === 1) {
        const willRemoved = state.products.filter((item) => item._id !== action.payload._id);
        state.products = willRemoved;
      }
    },
    updateColorSize: (state, action) => {
      const itemIndex = state.products.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        // state.products[itemIndex].cartColor = action.payload.color;
        // state.products[itemIndex].cartSisze = action.payload.size;
        state.products[itemIndex].color = action.payload.color;
        state.products[itemIndex].size = action.payload.size;
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    getTotal: (state) => {
      const { total, qty } = state.products.reduce(
        (itemTotal, product) => {
          const { price, quantity } = product;
          const itemTotalPrice = price * quantity;

          itemTotal.total += itemTotalPrice;
          itemTotal.qty += quantity;

          return itemTotal;
        },
        {
          total: 0,
          qty: 0,
        }
      );
      state.totalPrice = total;
      state.totalQuantity = qty;
    },
    submitCart: (state) => {
      state.cartCreated = true;
    },
  },
});

export const { addCart, increaseCart, removeFromCart, decreaseCart, clearCart, getTotal, updateColorSize, submitCart } = cartSlice.actions;
export default cartSlice.reducer;
