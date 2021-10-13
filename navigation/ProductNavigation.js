import React from "react";
import { View, SafeAreaView, Button } from "react-native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import ProductListScreen from "../screens/shop/ProductListScreen";
import { createAppContainer } from "react-navigation";
import Colors from "../constants/Color";
import ProductDetailsScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartDetailScreen";
import OrdersScreen from "../screens/shop/OrderListScreen";
import UserProductScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthenticaionScreen";
import ShopNavigator from "../screens/user/ShopNavigator";
import * as authActions from "../store/actions/Auth";
import { Ionicons } from "@expo/vector-icons";

let defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.secondaryColor,
  },

  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },

  headerBackTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerTintColor: "white",
};

const ProductNavigation = createStackNavigator(
  {
    ProductScreen: ProductListScreen,
    ProductDetails: ProductDetailsScreen,
    CartDetails: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

//Orders Navigation

const OrdersNavigation = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

//User product navigation

const UserProductNavigation = createStackNavigator(
  {
    UserProducts: UserProductScreen,
    EditProducts: EditProductScreen,
    ProductDetails: ProductDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

// Drawer navigation
const drawerNavigation = createDrawerNavigator(
  {
    Products: {
      screen: ProductNavigation,
      navigationOptions: {
        drawerIcon: (info) => {
          return (
            <Ionicons name="ios-list" size={20} color={Colors.primaryColor} />
          );
        },
      },
    },
    Orders: {
      screen: OrdersNavigation,
      navigationOptions: {
        drawerIcon: (info) => {
          return (
            <Ionicons name="ios-cart" size={20} color={Colors.primaryColor} />
          );
        },
      },
    },

    UserProducts: {
      screen: UserProductNavigation,
      navigationOptions: {
        drawerLabel: "User Products",
        drawerIcon: (info) => {
          return (
            <Ionicons name="ios-create" size={20} color={Colors.primaryColor} />
          );
        },
      },
    },
  },
  {
    contentOptions: {
      labelStyle: {
        fontFamily: "open-sans-bold",
        color: Colors.secondaryColor,
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color="red"
              onPress={() => {
                dispatch(authActions.logoutAction());
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

//Auth Navigation
const AuthNavigation = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const mainNavigation = createSwitchNavigator({
  ShopNav: ShopNavigator,
  Auth: AuthNavigation,
  Shop: drawerNavigation,
});
export default createAppContainer(mainNavigation);
