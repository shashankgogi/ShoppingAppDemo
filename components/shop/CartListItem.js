import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Color";

const CartItem = (props) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.quantity}>
          Qty:{" "}
          <Text style={{ color: Colors.primaryColor }}>{props.quantity}</Text>
        </Text>
      </View>
      <View style={styles.amountView}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        {props.isDeletable && (
          <TouchableOpacity
            onPress={() => {
              console.log("On delete click");
            }}
          >
            <Ionicons
              name="ios-trash"
              size={25}
              color="gray"
              onPress={props.onRemoveItemClick}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderColor: "#888",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
  },
  detailsView: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontFamily: "open-sans",
  },

  quantity: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    padding: 4,
  },

  amountView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  amount: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    padding: 15,
    color: Colors.secondaryColor,
  },
});

export default CartItem;
