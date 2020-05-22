import * as actionTypes from "./actionTypes";

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
  // localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  // localStorage.removeItem("userId");
  // return {
  //   type: actionTypes.AUTH_CLEAR_TOKENS,
  // };
  return {
    type: actionTypes.AUTH_INIT_CLEARTOKENS,
  };
};

export const clearTokensSucceed = () => {
  return {
    type: actionTypes.AUTH_CLEAR_TOKENS,
  };
};

export const logout = (authExpiration) => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT,
    authExpiration: authExpiration,
  };
};

export const authenticate = (email, password, isSignUp) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  // let url =
  //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCW3REY0vir8a1pR98m4L70uvSIcXukyUs";
  // if (!isSignUp) {
  //   url =
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCW3REY0vir8a1pR98m4L70uvSIcXukyUs";
  // }
  // return (dispatch) => {
  //   dispatch(authStart());
  //   axios
  //     .post(url, authData)
  //     .then((response) => {
  //       localStorage.setItem("token", response.data.idToken);
  //       localStorage.setItem(
  //         "expirationDate",
  //         new Date(new Date().getTime() + response.data.expiresIn * 1000)
  //       );
  //       localStorage.setItem("userId", response.data.localId);
  //       dispatch(authSuccess(response.data.idToken, response.data.localId));
  //       dispatch(logout(response.data.expiresIn));
  //     })
  //     .catch((error) => {
  //       dispatch(authFailed(error.response.data.error));
  //     });
  // };
  return {
    type: actionTypes.AUTH_USER,
    isSignUp: isSignUp,
    authData: authData,
  };
};

export const sethAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
    return {
      type: actionTypes.AUTH_CHECK_STATE
    }
};
