import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/Cart";
import { ADD_TO_ORDERS } from "../actions/Order";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/Product";
import Cart from "../../models/Cart";

const initialState = {
  cartProducts: [],
  totalSum: 0,
};

export default (state = initialState, action) => {
  let addedProduct = action.product;
  let cuurentCartProduct = [...state.cartProducts];

  switch (action.type) {
    case ADD_TO_CART: {
      const exisitngIndex = cuurentCartProduct.findIndex(
        (product) => product.id === addedProduct.id
      );
      const existingObj = cuurentCartProduct[exisitngIndex];
      let cartObj;
      if (exisitngIndex >= 0) {
        cartObj = new Cart(
          existingObj.id,
          existingObj.title,
          existingObj.price,
          existingObj.quantity + 1,
          existingObj.sum + existingObj.price
        );
        state.totalSum = existingObj.price + state.totalSum;
        cuurentCartProduct[exisitngIndex] = cartObj;
      } else {
        cartObj = new Cart(
          addedProduct.id,
          addedProduct.title,
          addedProduct.price,
          1,
          addedProduct.price
        );

        state.totalSum = state.totalSum + addedProduct.price;
        cuurentCartProduct.push(cartObj);
      }

      return {
        ...state,
        cartProducts: cuurentCartProduct,
        totalSum: state.totalSum,
      };
    }

    case REMOVE_FROM_CART: {
      const addedProducts = [...state.cartProducts];
      const index = addedProducts.findIndex(
        (product) => product.id === action.productId
      );
      const product = addedProducts.find(
        (product) => product.id === action.productId
      );
      if (product.quantity > 1) {
        addedProducts[index] = new Cart(
          product.id,
          product.title,
          product.price,
          product.quantity - 1,
          product.sum - product.price
        );
      } else {
        addedProducts.splice(index, 1);
      }

      return {
        ...state,
        cartProducts: addedProducts,
        totalSum: state.totalSum - product.price,
      };
    }
    case ADD_TO_ORDERS: {
      return { cartProducts: [], totalSum: 0.0 };
    }

    case DELETE_PRODUCT: {
      let product = state.cartProducts.find(
        (product) => product.id === action.productId
      );
      if (product) {
        return {
          ...state,
          cartProducts: state.cartProducts.filter(
            (product) => product.id !== action.productId
          ),
          totalSum: state.totalSum - product.sum,
        };
      }
    }
    case UPDATE_PRODUCT: {
      const cartProducts = [...state.cartProducts];

      const product = cartProducts.find(
        (productObj) => productObj.id === action.productData.id
      );
      if (product) {
        let index = cartProducts.findIndex(
          (productObj) => product.id === productObj.id
        );

        let prodObj = new Product(
          product.id,
          product.userId,
          action.productData.title,
          action.productData.image,
          action.productData.description,
          product.price
        );

        cartProducts[index] = prodObj;
        return { ...state, cartProducts: cartProducts };
      }
    }
    default:
      return state;
  }
};
