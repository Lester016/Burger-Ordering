import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  clearTokensSaga,
  logoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_INIT_CLEARTOKENS, clearTokensSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
