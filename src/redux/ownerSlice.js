import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    myShopData: null,
  },
  reducers: {
    setMyShopData: (state, action) => {
      state.myShopData = action.payload;
    },
    clearOwnerData: (state) => {
      state.myShopData = null;
    },
  },
});

export const {setMyShopData,clearOwnerData} = ownerSlice.actions
export default ownerSlice.reducer