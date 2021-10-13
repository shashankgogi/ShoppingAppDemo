import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const TEXT_CHANGE = "TEXT_CHANGE";
const TEXT_BLUR = "TEXT_BLUR";

const inputTextReducer = (state, action) => {
  switch (action.type) {
    case TEXT_CHANGE: {
      return { ...state, value: action.value, isValid: action.isValid };
    }
    case TEXT_BLUR: {
      return { ...state, isTouched: true };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputTextReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initialValidity ? props.initialValidity : false,
    isTouched: false,
  });

  const onTextChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({
      type: TEXT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: TEXT_BLUR });
  };

  const { id, onItemChange } = props;
  useEffect(() => {
    if (inputState.isTouched) {
      onItemChange(id, inputState.value, inputState.isValid);
    }
  }, [onItemChange, inputState, id]);

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={onTextChangeHandler}
        onBlur={lostFocusHandler}
      ></TextInput>
      {!inputState.isValid && inputState.isTouched && (
        <Text style={{ color: "red" }}>{props.errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    marginTop: 8,
  },
  title: {
    fontFamily: "open-sans-bold",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    textAlign: "left",
    fontFamily: "open-sans",
    padding: 5,
  },
});

export default Input;
