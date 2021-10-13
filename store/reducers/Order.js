import { ADD_TO_ORDERS, ADD_ORDERS } from "../actions/Order";
import Order from "../../models/Order";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDERS: {
      return { items: action.orders };
    }

    case ADD_TO_ORDERS: {
      const itemsArr = [...state.items];
      let orderObj = new Order(
        action.orderItems.id,
        action.orderItems.totalAmount,
        action.orderItems.date,
        action.orderItems.items
      );
      itemsArr.push(orderObj);
      return { ...state, items: itemsArr };
    }
    default:
      return state;
  }
};
