import Order from "../../models/Order";
import { or } from "react-native-reanimated";

export const ADD_TO_ORDERS = "ADD_TO_ORDERS";
export const ADD_ORDERS = "ADD_ORDERS";

export const fetchOrdersFromServer = () => {
  return async (dispatch, getState) => {
    let userId = getState().Auth.userId;
    const responseData = await fetch(
      `https://rn-shoppigapp.firebaseio.com/orders/${userId}.json`,
      {
        method: "GET",
      }
    );
    const resData = await responseData.json();
    console.log(resData);
    let addedOrders = [];
    for (const key in resData) {
      let order = resData[key];
      addedOrders.push(new Order(key, order.totalAmt, order.date, order.items));
    }
    dispatch({ type: ADD_ORDERS, orders: addedOrders });
  };
};

export const addToOrdersAction = (totalAmt, cartItems) => {
  return async (dispatch, getState) => {
    let token = getState().Auth.token;
    let userId = getState().Auth.userId;
    let date = new Date();
    const responseData = await fetch(
      `https://rn-shoppigapp.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmt,
          date: date.toISOString(),
        }),
      }
    );

    const resData = await responseData.json();
    console.log(resData);

    if (!responseData.ok) {
    } else {
      dispatch({
        type: ADD_TO_ORDERS,
        orderItems: {
          id: resData.name,
          totalAmount: totalAmt,
          items: cartItems,
          date: date,
        },
      });
    }
  };
};
