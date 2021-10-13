import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Color";
import OrderItem from "../../components/shop/CartListItem";
const OrderListItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderView}>
      <View style={styles.amountSummary}>
        <Text style={styles.amount}>{props.item.totalAmt.toFixed(2)}</Text>
        <Text style={styles.orderId}>{props.item.readableDate}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primaryColor}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={{ width: "100%" }}>
          {props.item.items.map((order) => (
            <OrderItem
              key={order.id.toString()}
              title={order.title}
              quantity={order.quantity}
              amount={order.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderView: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    borderRadius: 5,
    backgroundColor: "white",
    width: "98%",
    marginTop: 10,
    marginHorizontal: 5,
  },

  amountSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Colors.secondaryColor,
  },

  orderId: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
});

export default OrderListItem;
