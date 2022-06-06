import axios from "axios";
import { CLEAR_ERRORS } from "./userAction";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

// Create Order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/order/create", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CREATE_ORDER_REQUEST, payload: err.response.data });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
