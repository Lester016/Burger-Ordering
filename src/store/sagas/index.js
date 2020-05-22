import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { clearTokensSaga, logoutSaga, authUserSaga } from "./auth";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_INIT_CLEARTOKENS, clearTokensSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
