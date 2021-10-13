export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCartAction = (productObj) => {
  return { type: ADD_TO_CART, product: productObj };
};

export const removeFromCartAction = (productId) => {
  return { type: REMOVE_FROM_CART, productId: productId };
};
