import PRODUCTS from "../../data/Dummy_data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/Product";

import Product from "../../models/Product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.filteredProducts,
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
    }
    case CREATE_PRODUCT: {
      let productObject = new Product(
        action.productData.productId,
        "u1",
        action.productData.title,
        action.productData.image,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        userProducts: state.userProducts.concat(productObject),
        availableProducts: state.availableProducts.concat(productObject),
      };
    }
    case UPDATE_PRODUCT: {
      const userProducts = [...state.userProducts];
      const availableProducts = [...state.availableProducts];

      const product = state.userProducts.find(
        (productObj) => productObj.id === action.productData.id
      );

      let index = userProducts.findIndex(
        (productObj) => product.id === productObj.id
      );
      let availableProdIndex = availableProducts.findIndex(
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

      console.log(action.productData);
      userProducts[index] = prodObj;
      availableProducts[availableProdIndex] = prodObj;
      return {
        ...state,
        userProducts: userProducts,
        availableProducts: availableProducts,
      };
    }
    default:
      return state;
  }
};
