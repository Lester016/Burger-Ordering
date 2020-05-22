import { put, delay } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/auth";

export function* clearTokensSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");

  yield put(actions.clearTokensSucceed());
}

export function* logoutSaga(action) {
  yield delay(action.authExpiration * 1000);
  yield put(actions.clearTokens());
}

export function* authUserSaga(action) {
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCW3REY0vir8a1pR98m4L70uvSIcXukyUs";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCW3REY0vir8a1pR98m4L70uvSIcXukyUs";
  }

  try {
    yield put(actions.authStart());
    const response = yield axios.post(url, action.authData);
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem(
      "expirationDate",
      new Date(new Date().getTime() + response.data.expiresIn * 1000)
    );
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.logout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}
