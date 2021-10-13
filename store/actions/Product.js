export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
import Product from "../../models/Product";

export const fetchProductsFromServer = () => {
  return async (dispatch, getState) => {
    let userId = getState().Auth.userId;
    try {
      const responseData = await fetch(
        "https://rn-shoppigapp.firebaseio.com/products.json"
      );

      if (!responseData.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await responseData.json();

      const productsArr = [];
      for (const key in resData) {
        const prod = resData[key];
        console.log(prod);
        productsArr.push(
          new Product(
            key,
            prod.userId,
            prod.title,
            prod.image,
            prod.description,
            parseInt(prod.price)
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: productsArr,
        filteredProducts: productsArr.filter((prod) => prod.userId === userId),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProductAction = (id) => {
  return async (dispatch, getState) => {
    let token = getState().Auth.token;
    const responseData = await fetch(
      `https://rn-shoppigapp.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    let data = await responseData.json();
    console.log(data);
    dispatch({ type: DELETE_PRODUCT, productId: id });
  };
};

export const createProductAction = (title, price, image, description) => {
  return async (dispacth, getState) => {
    let token = getState().Auth.token;
    let userId = getState().Auth.userId;
    const responseData = await fetch(
      `https://rn-shoppigapp.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
        },
        body: JSON.stringify({
          title,
          price,
          image,
          description,
          userId: userId,
        }),
      }
    );

    let resData = await responseData.json();
    console.log(resData);

    if (!responseData.ok) {
      throw new Error(resData.error);
    } else {
      dispacth({
        type: CREATE_PRODUCT,
        productData: {
          productId: resData.name,
          title,
          price,
          image,
          description,
        },
      });
    }
  };
};

export const updateProductAction = (id, title, image, description) => {
  return async (dispatch, getState) => {
    let token = getState().Auth.token;
    try {
      const responseData = await fetch(
        `https://rn-shoppigapp.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "applicaton/json",
          },
          body: JSON.stringify({
            title,
            image,
            description,
          }),
        }
      );

      if (!responseData.ok) {
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: UPDATE_PRODUCT,
        productData: {
          id,
          title,
          image,
          description,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
