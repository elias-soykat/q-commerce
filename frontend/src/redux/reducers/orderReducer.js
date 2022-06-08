import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../actions/orderAction";
import { CLEAR_ERRORS } from "../actions/userAction";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    }

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: true,
        err: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        err: null,
      };

    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
      return {
        ...state,
        loading: true,
        err: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        err: null,
      };

    default:
      return state;
  }
};

const initialState = {
  order: {},
  loading: true,
};
export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: true,
        err: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        err: null,
      };

    default:
      return state;
  }
};
