import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import bugerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import { Provider } from "react-redux";
import authReducer from "./store/reducers/auth";
import { watchAuth, watchBurgerBuilder, watchOrder } from "./store/sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  burger: bugerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
