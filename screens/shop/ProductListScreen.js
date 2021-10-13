import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ProductListItem from "../../components/shop/ProductListItem";
import * as cartActions from "../../store/actions/Cart";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Color";
import * as productActions from "../../store/actions/Product";

const ProductListScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  let dispatch = useDispatch();
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );

  const addToCartHandler = (itemData) => {
    dispatch(cartActions.addToCartAction(itemData.item));
  };

  const navigateToProductDetailScreen = (itemData) => {
    props.navigation.navigate("ProductDetails", {
      productId: itemData.item.id,
      title: itemData.item.title,
    });
  };

  const loadServerProducts = useCallback(async () => {
    console.log("Inn load...");
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProductsFromServer());
    } catch (error) {
      setError(error);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", () => {
      setIsLoading(true);
      loadServerProducts().then(() => {
        setIsLoading(false);
      });
    });

    return () => {
      willFocusSub.remove();
    };
  }, [loadServerProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadServerProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadServerProducts]);

  if (isLoading) {
    return (
      <View style={styles.activityView}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.activityView}>
        <Text>{error.message}</Text>
        <Button
          title="Try again"
          onPress={loadServerProducts}
          color={Colors.secondaryColor}
        />
      </View>
    );
  }

  if (!isLoading && availableProducts.length === 0) {
    return (
      <View style={styles.activityView}>
        <Text>NO products to load</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadServerProducts}
      refreshing={isRefreshing}
      style={{ marginBottom: 20 }}
      keyExtractor={(item) => item.id}
      data={availableProducts}
      renderItem={(itemData) => (
        <ProductListItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.image}
          onItemClick={navigateToProductDetailScreen.bind(this, itemData)}
        >
          <Button
            color={Colors.primaryColor}
            title="View Details"
            onPress={navigateToProductDetailScreen.bind(this, itemData)}
          />
          <Button
            color={Colors.primaryColor}
            title="Add To Cart"
            onPress={addToCartHandler.bind(this, itemData)}
          />
        </ProductListItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  activityView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

ProductListScreen.navigationOptions = (navData) => {
  return {
    title: "Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => {
            navData.navigation.navigate("CartDetails");
          }}
        />
      </HeaderButtons>
    ),
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

export default ProductListScreen;
