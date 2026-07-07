import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    products: [],
    productDetail: {},
    cartItems: [],
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetail = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
});

export const {
  setSellerProducts,
  setProducts,
  setProductDetails,
  setCartItems,
} = productSlice.actions;
export default productSlice.reducer;
