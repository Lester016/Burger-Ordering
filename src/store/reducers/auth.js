import * as actionTypes from "../actions/actionTypes";

const initialState = {
  email: "",
  password: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        email: action.authData.email,
        password: action.authData.password
      };
    default:
      return state;
  }
};

export default reducer;
