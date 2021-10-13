export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATION = "AUTHENTICATION";
import { AsyncStorage } from "react-native";

export const authenticationAction = (userId, token) => {
  return { type: AUTHENTICATION, userId: userId, token: token };
};
export const signUpAction = (email, password) => {
  return async (dispatch) => {
    const resposeData = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD63eIgiktMxBOYbb-irgYIZmpdbJzkE5U`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    let data = await resposeData.json();
    console.log(data);

    let errorMsg = "Something went wrong!!";
    if (!resposeData.ok) {
      if (data.error.message === "EMAIL_EXISTS") {
        errorMsg = "Email id already exists";
      }
      throw new Error(errorMsg);
    } else {
      let expiredIn = new Date().getTime() + parseInt(data.expiresIn) * 1000;
      saveUserData(data.localId, data.idToken, expiredIn);
      dispatch({ type: SIGNUP, userId: data.localId, token: data.idToken });
    }
  };
};

export const loginAction = (email, password) => {
  return async (dispatch) => {
    try {
      const resposeData = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD63eIgiktMxBOYbb-irgYIZmpdbJzkE5U`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      let data = await resposeData.json();
      console.log(data);
      let errorMsg = "Something went wrong!!";
      if (!resposeData.ok) {
        if (data.error.message === "EMAIL_NOT_FOUND") {
          errorMsg = "Entered email is invalid";
        } else if (data.error.message === "INVALID_PASSWORD") {
          errorMsg = "Entered password is invalid";
        }
        throw new Error(errorMsg);
      } else {
        let expiredIn = new Date().getTime() + parseInt(data.expiresIn) * 1000;
        saveUserData(data.localId, data.idToken, expiredIn);
        dispatch({ type: LOGIN, userId: data.localId, token: data.idToken });
      }
    } catch (err) {
      throw err;
    }
  };
};
export const logoutAction = () => {
  clearUserData();
  return { type: LOGOUT };
};

const clearUserData = () => {
  AsyncStorage.removeItem("userData");
};
const saveUserData = (userId, token, expirationTime) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId,
      token,
      expirationTime,
    })
  );
};
