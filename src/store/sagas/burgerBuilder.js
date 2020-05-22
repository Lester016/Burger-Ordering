import { put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/burgerBuilder";

export function* initIngredientsSaga() {
  try {
    const response = yield axios.get(
      "https://lestersburger.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
    yield console.log(error);
  }
}
