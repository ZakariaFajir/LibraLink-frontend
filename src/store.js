import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import productSlice from './features/productSlice';
import cartSlice from './features/cartSlice';
import emailConfirmationSlice from './features/emailConfirmationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productSlice,
    cartItems: cartSlice,
    email: emailConfirmationSlice,
  },
});

export default store;
