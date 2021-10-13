import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/Product";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Color";

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

const EditProductScreen = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  let productId = props.navigation.getParam("productId");
  let dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormAction] = useReducer(textInputReducer, {
    textInputState: {
      title: product ? product.title : "",
      image: product ? product.image : "",
      price: "",
      description: product ? product.description : "",
    },
    textInputValidations: {
      title: product ? true : false,
      image: product ? true : false,
      price: product ? true : false,
      description: product ? true : false,
    },

    isFormValid: product ? true : false,
  });

  const saveProductDetails = useCallback(async () => {
    Keyboard.dismiss();
    setError(null);
    setLoading(true);
    if (!formState.isFormValid) {
      Alert.alert("Alert", "Please enter the required fileds", [
        {
          text: "Okay",
          style: "destructive",
        },
      ]);
      return;
    }

    try {
      if (product) {
        await dispatch(
          productActions.updateProductAction(
            productId,
            formState.textInputState.title,
            formState.textInputState.image,
            formState.textInputState.description
          )
        );
      } else {
        await dispatch(
          productActions.createProductAction(
            formState.textInputState.title,
            +formState.textInputState.price,
            formState.textInputState.image,
            formState.textInputState.description
          )
        );
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({
      saveAction: saveProductDetails,
    });
  }, [saveProductDetails]);

  useEffect(() => {
    if (error) {
      Alert.alert("Alert", error, [{ text: "Okay" }]);
    }
  }, [error]);

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

  if (isLoading) {
    return (
      <View style={styles.activityView}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("dismiss");
            Keyboard.dismiss();
          }}
        >
          <View style={styles.form}>
            <Input
              id="title"
              label="Title"
              errorText="Please enter a valid title!"
              // value={formState.textInputState.title}
              onItemChange={onTextChangeHandler}
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              keyboardType="default"
              initialValue={product ? product.title : ""}
              initialValidity={!!product}
              required
            />
            <Input
              id="image"
              label="Image"
              errorText="Please enter a valid image url!"
              // value={formState.textInputState.image}
              onItemChange={onTextChangeHandler}
              returnKeyType="next"
              keyboardType="default"
              initialValue={product ? product.image : ""}
              initialValidity={!!product}
              required
            />

            {product ? null : (
              <Input
                id="price"
                label="Price"
                errorText="Please enter a valid price!"
                // value={formState.textInputState.price}
                onItemChange={onTextChangeHandler}
                returnKeyType="next"
                keyboardType="decimal-pad"
                initialValue={product ? product.price : ""}
                initialValidity={!!product}
                required
                min={0.1}
              />
            )}
            <Input
              id="description"
              label="Description"
              errorText="Please enter a valid description!"
              // value={formState.textInputState.description}
              onItemChange={onTextChangeHandler}
              returnKeyType="done"
              keyboardType="default"
              initialValue={product ? product.description : ""}
              initialValidity={!!product}
              required
              autoCapitalize="sentences"
              autoCorrect
              multiline
              numberOfLines={3}
              minLength={5}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  let saveAction = navData.navigation.getParam("saveAction");
  return {
    title: "Edit",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="ios-checkmark" onPress={saveAction} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  activityView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
