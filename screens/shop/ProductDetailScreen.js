import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/Cart";

import Colors from "../../constants/Color";
import {
  ScrollView,
  View,
  Image,
  Button,
  Text,
  StyleSheet,
} from "react-native";

const ProductDetailsScreen = (props) => {
  let dispatch = useDispatch();
  let selectedProductId = props.navigation.getParam("productId");
  let product = useSelector((state) =>
    state.products.availableProducts.find(
      (product) => product.id === selectedProductId
    )
  );
  const addToCartHandler = () => {
    dispatch(cartActions.addToCartAction(product));
  };

  return (
    <ScrollView>
      <View style={styles.view}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <View style={styles.button}>
          <Button
            color={Colors.primaryColor}
            title="Add to cart"
            onPress={addToCartHandler}
          />
        </View>
        <Text style={styles.price}>${product.price.toFixed(2)} </Text>
        <View style={styles.details}>
          <Text style={styles.description}> {product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    width: "98%",
    height: 300,
    marginVertical: 10,
  },

  price: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    paddingVertical: 10,
    fontFamily: "open-sans",
  },
  details: {
    alignItems: "center",
    width: "90%",
  },

  description: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "open-sans",
  },
  button: {
    marginVertical: 5,
    marginTop: 10,
  },
});

ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    title: navData.navigation.getParam("title"),
  };
};

export default ProductDetailsScreen;
