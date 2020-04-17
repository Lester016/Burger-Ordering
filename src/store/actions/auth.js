import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: token,
    userId: userId,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const clearTokens = () => {
  return {
    type: actionTypes.AUTH_CLEAR_TOKENS,
  };
};

export const logout = (authExpiration) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(clearTokens());
    }, authExpiration);
  };
};

export const authenticate = (email, password, isSignUp) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCW3REY0vir8a1pR98m4L70uvSIcXukyUs";
  if (!isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCW3REY0vir8a1pR98m4L70uvSIcXukyUs";
  }
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(logout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch(authFailed(error.response.data.error));
      });
  };
};
