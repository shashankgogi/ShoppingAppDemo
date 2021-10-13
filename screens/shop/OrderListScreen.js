import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import OrderListItem from "../../components/shop/OrderListItem";
import * as orderActions from "../../store/actions/Order";
import Colors from "../../constants/Color";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const addedOrders = useSelector((state) => state.orders.items);
  let dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(orderActions.fetchOrdersFromServer());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadOrders().then(() => {
      console.log("finish loading...");
    });
  }, [loadOrders]);

  if (isLoading) {
    return (
      <View style={styles.activityView}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (addedOrders.length === 0) {
    return (
      <View style={styles.activityView}>
        <Text>No Orders Found</Text>
      </View>
    );
  }

  return (
    <FlatList
      keyExtractor={(itemData) => itemData.id.toString()}
      style={styles.screen}
      data={addedOrders}
      renderItem={(itemData) => <OrderListItem item={itemData.item} />}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  activityView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

OrdersScreen.navigationOptions = (navData) => {
  return {
    title: "My Orders",

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Drawer"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
