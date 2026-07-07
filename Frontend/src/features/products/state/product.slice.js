import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    products: [],
    productDetail: {}
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
  },
});

export const { setSellerProducts, setProducts, setProductDetails } = productSlice.actions;
export default productSlice.reducer;


// {
//     "price": {
//         "amount": 1000,
//         "currency": "INR"
//     },
//     "_id": "6a472339322650b3e82c58e7",
//     "title": "test_product_title_1",
//     "description": "test_product_description_1",
//     "seller": "69f2fc646f9b5f28e0d2ce19",
//     "images": [
//         {
//             "url": "https://ik.imagekit.io/h9m1sz0rc/Snitch/LinkedIn_Banner_6UpLEMhIC.png",
//             "_id": "6a472339322650b3e82c58e8"
//         },
//         {
//             "url": "https://ik.imagekit.io/h9m1sz0rc/Snitch/20260330223722_UG1JEudcM.png",
//             "_id": "6a472339322650b3e82c58e9"
//         }
//     ],
//     "createdAt": "2026-07-03T02:49:29.782Z",
//     "updatedAt": "2026-07-03T02:49:29.782Z",
//     "__v": 0
// }