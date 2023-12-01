import { createSlice } from "@reduxjs/toolkit";

const emailConfirmationSlice = createSlice({
  name: "email",
  initialState: "",
  reducers: {
    setEmailReducer: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEmailReducer } = emailConfirmationSlice.actions;
export default emailConfirmationSlice.reducer;
