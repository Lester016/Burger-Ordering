import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PUCRHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const sendOrderData = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_ORDER,
    orderData: orderData,
    token: token,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderSuccess = (orderData) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orderData: orderData,
  };
};

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error: error,
  };
};

export const fetchOrder = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDER,
    token: token,
    userId: userId,
  };
};
