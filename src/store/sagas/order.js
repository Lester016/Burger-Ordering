import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import * as actions from "../actions/order";

export function* sendOrderSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrderSaga(action) {
  yield put(actions.purchaseBurgerStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrderSuccess(fetchedOrders));
    //this.setState({ loading: false, orders: fetchedOrders });
  } catch (error) {
    yield put(actions.fetchOrderFailed(error));
    // this.setState({ loading: false });
  }
}
