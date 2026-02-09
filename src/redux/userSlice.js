import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    shopsInMyCity: null,
    itemsInMyCity: null,
    cartItems: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
    addToCart: (state, action) => {
      const cardItem = action.payload;
      const existing = state.cartItems.find((i) => i.id == cardItem.id);
      if (existing) {
        existing.quantity += cardItem.quantity;
      } else {
        state.cartItems.push(cardItem);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id == id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    clearUserData: (state) => {
      state.userData = null;
      state.currentCity = null;
      state.currentState = null;
      state.currentAddress = null;
      state.shopsInMyCity = null;
      state.itemsInMyCity = null;
      state.cartItems = [];
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  setShopsInMyCity,
  setItemsInMyCity,
  addToCart,
  clearUserData,
  updateQuantity,
  removeCartItem,
} = userSlice.actions;
export default userSlice.reducer;
