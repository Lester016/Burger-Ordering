import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PUCRHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.id,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
        totalPrice: 4,
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        error: action.error,
        loading: false
      };

    // Order Fetching
    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orderData,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
