import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Color";
import CartItem from "../../components/shop/CartListItem";
import * as cartActions from "../../store/actions/Cart";
import * as orderActions from "../../store/actions/Order";

const CartScreen = (props) => {
  const addedProducts = useSelector((state) => state.cartProducts.cartProducts);
  const totalSum = useSelector((state) => state.cartProducts.totalSum);
  let dispatch = useDispatch();
  return (
    <View style={styles.mainView}>
      <View style={styles.summaryView}>
        <View style={styles.summaryText}>
          <Text style={styles.amountTitle}>Total Amount:</Text>
          <Text style={styles.amount}>
            {(Math.round(totalSum.toFixed(2)) * 100) / 100}
          </Text>
        </View>
        <Button
          title="Order Now"
          color={Colors.secondaryColor}
          disabled={addedProducts.length === 0}
          onPress={() =>
            dispatch(orderActions.addToOrdersAction(totalSum, addedProducts))
          }
        />
      </View>

      <FlatList
        style={{ width: "100%" }}
        data={addedProducts}
        renderItem={(itemData) => (
          <CartItem
            title={itemData.item.title}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
            isDeletable
            onRemoveItemClick={() =>
              dispatch(cartActions.removeFromCartAction(itemData.item.id))
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  summaryView: {
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },

  summaryText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    width: "100%",
  },
  amountTitle: {
    fontFamily: "open-sans",
    fontSize: 18,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Colors.secondaryColor,
  },
});

CartScreen.navigationOptions = {
  title: "Cart",
};
export default CartScreen;
