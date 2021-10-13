import React, { useCallback, useReducer, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Color";
import * as AuthActions from "../../store/actions/Auth";
import { LinearGradient } from "expo-linear-gradient";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const textInputReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      const updatedInputValues = {
        ...state.textInputState,
        [action.inputId]: action.value,
      };

      const updatedInputValidations = {
        ...state.textInputValidations,
        [action.inputId]: action.isValid,
      };

      let updatedFormValidState = true;

      for (const key in updatedInputValidations) {
        updatedFormValidState =
          updatedFormValidState && updatedInputValidations[key];
      }

      return {
        textInputState: updatedInputValues,
        textInputValidations: updatedInputValidations,
        isFormValid: updatedFormValidState,
      };
    }
    default:
      return state;
  }
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, dispatchFormAction] = useReducer(textInputReducer, {
    textInputState: {
      email: "",
      password: "",
    },
    textInputValidations: {
      email: false,
      password: false,
    },
    isFormValid: false,
  });

  const onTextChangeHandler = useCallback(
    (id, text, isTextValid) => {
      dispatchFormAction({
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid: isTextValid,
        inputId: id,
      });
    },
    [dispatchFormAction]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("Alert", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await dispatch(
          AuthActions.signUpAction(
            formState.textInputState.email,
            formState.textInputState.password
          )
        );
      } else {
        await dispatch(
          AuthActions.loginAction(
            formState.textInputState.email,
            formState.textInputState.password
          )
        );
      }

      props.navigation.navigate("Shop");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={styles.screen}
    >
      <LinearGradient colors={["#f5d6c9", "#ffedff"]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <View style={styles.view}>
            <Input
              id="email"
              label="Email"
              errorText="Please enter a valid email!"
              onItemChange={onTextChangeHandler}
              autoCorrect={false}
              returnKeyType="next"
              keyboardType="email-address"
              initialValue=""
              email
              initialValidity={false}
              required
            />
            <Input
              id="password"
              label="Password"
              errorText="Please enter a valid password!"
              onItemChange={onTextChangeHandler}
              secureTextEntry={true}
              returnKeyType="done"
              keyboardType="default"
              min={5}
              initialValue=""
              initialValidity={false}
              required
            />
            <View style={styles.botton}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primaryColor} />
              ) : (
                <Button
                  title={isSignUp ? "Sign Up" : "Login"}
                  color={Colors.primaryColor}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.botton}>
              <Button
                title={isSignUp ? "Switch To Login" : "Switch To Sign Up"}
                color={Colors.secondaryColor}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  title: "Authentication",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  gradient: {
    flex: 1,
  },
  scrollview: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  view: {
    width: "90%",
  },

  botton: {
    marginTop: 15,
    // backgroundColor: "red",
  },
});

export default AuthScreen;
