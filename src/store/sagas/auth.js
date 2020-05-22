import { put, delay } from "redux-saga/effects";

import * as actions from "../actions/auth";

export function* clearTokens(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");

  yield put(actions.clearTokensSucceed());
}

export function* logout(action) {
  yield delay(action.authExpiration * 1000);
  yield put(actions.clearTokens());
}
