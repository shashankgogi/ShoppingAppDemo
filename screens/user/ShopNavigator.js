import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  AsyncStorage,
} from "react-native";
import Colors from "../../constants/Color";
import * as authActions from "../../store/actions/Auth";

const ShopNavigator = (props) => {
  let dispatch = useDispatch();
  const authenticateUser = async () => {
    let userData = await AsyncStorage.getItem("userData");
    if (!userData) {
      props.navigation.navigate("Auth");
      return;
    }

    const { token, userId, expirationTime } = JSON.parse(userData);
    console.log(token);
    if (expirationTime <= new Date().getTime() || !token || !userId) {
      props.navigation.navigate("Auth");
      return;
    }

    dispatch(authActions.authenticationAction(userId, token));
    props.navigation.navigate("Shop");
  };
  useEffect(() => {
    authenticateUser();
  });
  return (
    <View>
      <ActivityIndicator
        style={styles.activityView}
        size="large"
        color={Colors.primaryColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  activityView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default ShopNavigator;
