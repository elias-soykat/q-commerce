import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  productDetailsReducer,
  productsReducer,
} from "./reducers/productsReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  productsList: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userInfoFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
