import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// PRODUCT_REDUCER_LIST
import {
  productDetailsReducer,
  productsReducer,
} from "./reducers/productsReducer";

// USER_REDUCER_LIST
import {
  forgetPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import { newOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  productsList: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
});

const userStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : { loading: false, isAuthenticated: false, err: null };

const initialState = {
  user: userStorage,

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
