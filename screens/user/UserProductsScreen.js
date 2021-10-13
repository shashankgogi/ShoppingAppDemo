import React from "react";
import { FlatList, StyleSheet, Button, Alert, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import ProductListItem from "../../components/shop/ProductListItem";
import Colors from "../../constants/Color";
import * as productAction from "../../store/actions/Product";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  let dispahtch = useDispatch();
  const navigateToProductEditScreen = (itemData) => {
    props.navigation.navigate("EditProducts", {
      productId: itemData.item.id,
    });
  };

  const navigateToProductDetailScreen = (itemData) => {
    props.navigation.navigate("ProductDetails", {
      productId: itemData.item.id,
    });
  };

  const deleteConfirmationHandler = (productId) => {
    Alert.alert("Are you sure", "Do you want to delete this product?", [
      { text: "No", style: "default", onPress: () => {} },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispahtch(productAction.deleteProductAction(productId));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.emptyView}>
        <Text>No Products Found</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={{ marginBottom: 20 }}
      data={userProducts}
      renderItem={(itemData) => (
        <ProductListItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.image}
          onItemClick={navigateToProductDetailScreen.bind(this, itemData)}
        >
          <Button
            color={Colors.primaryColor}
            title="Edit"
            onPress={navigateToProductEditScreen.bind(this, itemData)}
          />
          <Button
            color={Colors.primaryColor}
            title="Delete"
            onPress={deleteConfirmationHandler.bind(this, itemData.item.id)}
          />
        </ProductListItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    title: "Your Products",

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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="ios-create"
          onPress={() => {
            navData.navigation.navigate("EditProducts");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProductScreen;
