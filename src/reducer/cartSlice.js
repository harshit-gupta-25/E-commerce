import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            state.cartItems = [...state.cartItems, item];
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increaseItem: (state, action) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find((item) => item.id === itemId);
            cartItem.quantity = cartItem.quantity + 1;
        },
        decreaseItem: (state, action) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find((item) => item.id === itemId);
            cartItem.quantity = cartItem.quantity - 1;
        },
        calculateTotal: (state) => {
            let total = 0;
            state.cartItems.forEach((item) => {
                total += item.quantity * item.price;
            });
            state.total = total;
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseItem,
    decreaseItem,
    calculateTotal,
    clearCart } = cartSlice.actions;

export default cartSlice.reducer;