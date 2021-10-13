import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import Colors from "../../constants/Color";

const ProductListItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onItemClick}>
      <View style={styles.product}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>{props.children}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "60%",
  },

  details: {
    alignItems: "center",
    height: "15%",
    marginVertical: 5,
    // backgroundColor: "gray",
  },
  title: {
    fontSize: 18,
    paddingVertical: 4,
    fontFamily: "open-sans",
  },
  price: {
    fontSize: 18,
    paddingVertical: 4,
    fontFamily: "open-sans",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: "25%",
    // backgroundColor: "red",
  },
});
export default ProductListItem;
