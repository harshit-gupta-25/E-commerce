import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../reducer/cartSlice';

export const cartStore = configureStore({
    reducer: {
        cart: cartReducer,
    },
});