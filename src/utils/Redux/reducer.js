import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addPrdToCart: (state, action) => {
      let filteredCart = state.cart.filter(
        (prod) => prod.id == action.payload.id
      );
      if (filteredCart.length > 0) {
        state.cart.map((prod) => {
          if (prod.id == action.payload.id) {
            return (prod.quantityAdded = prod.quantityAdded + 1);
          } else {
            return prod;
          }
        });
      } else {
        action.payload.quantityAdded = 1;
        state.cart.push(action.payload);
      }
      //set the cart storage in localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removePrdFromCart: (state, action) => {
      state.cart = state.cart.filter((prod) => prod.id !== action.payload.id);
      //set the cart storage in localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setProductsInCart: (state, action) => {
      // console.log(action.payload);
      state.cart.map((prd) => {
        if (prd.id == action.payload.product.id) {
          return (prd.quantityAdded = action.payload.quantity);
        }
        return prd;
      });
      //set cart in localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    getPrdFromCart: (state, action) => {
      state.cart = JSON.parse(localStorage.getItem("cart")) || [];
    },
  },
});
export const {
  setProducts,
  addPrdToCart,
  getPrdFromCart,
  removePrdFromCart,
  setProductsInCart,
} = productSlice.actions;
export default productSlice.reducer;
