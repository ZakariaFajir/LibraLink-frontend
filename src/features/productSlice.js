import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    all: [],
    filtred: []
  },
  reducers: {
    setFiltred: (state, action) => {
      state.filtred = action.payload;
    },
    setAll: (state, action) => {
      state.all = action.payload;
    },
  },
});

export const { setFiltred, setAll } = productSlice.actions;
export default productSlice.reducer;
