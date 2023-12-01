import { createSlice } from "@reduxjs/toolkit";

const cartItemslice = createSlice({
  name: "cartItems",
  initialState: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.find((item) => item._id === newItem._id);
      const cartItems = existItem
        ? state.map((item) => {
            return item._id === existItem._id ? newItem : item;
          })
        : [...state, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    },
    removeFromCart: (state, action) => {
      const cartItems = state.filter((c) => c._id !== action.payload._id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return cartItems;
    },
    removeAll: (state, action) => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, removeAll } = cartItemslice.actions;
export default cartItemslice.reducer;
