import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (id, orderData) => {
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

export const sendOrderData = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
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

export const fetchOrder = () => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
        //this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        dispatch(fetchOrderFailed(err));
        // this.setState({ loading: false });
      });
  };
};
