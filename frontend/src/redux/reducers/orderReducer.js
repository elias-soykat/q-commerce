import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
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
