import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { clearTokens, logout } from "./auth";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logout);
  yield takeEvery(actionTypes.AUTH_INIT_CLEARTOKENS, clearTokens);
}
