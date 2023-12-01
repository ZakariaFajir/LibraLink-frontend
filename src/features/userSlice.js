import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  reducers: {
    signIn: (state, action) => {
      return action.payload;
    },
    signOut: (state) => {
      return null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
