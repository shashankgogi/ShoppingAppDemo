import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import ReduxThunk from "redux-thunk";

import ProductReducer from "./store/reducers/Product";
import CartReducer from "./store/reducers/Cart";
import OrderReducer from "./store/reducers/Order";
import AuthReducer from "./store/reducers/Auth";
import ProductsNavigation from "./navigation/ProductNavigation";

const fetchAllFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const rootReducer = combineReducers({
    products: ProductReducer,
    cartProducts: CartReducer,
    orders: OrderReducer,
    Auth: AuthReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchAllFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ProductsNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});
