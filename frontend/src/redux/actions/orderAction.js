import axios from "axios";
import { CLEAR_ERRORS } from "./userAction";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

export const MY_ORDERS_REQUEST = "MY_ORDERS_REQUEST";
export const MY_ORDERS_SUCCESS = "MY_ORDERS_SUCCESS";
export const MY_ORDERS_FAIL = "MY_ORDERS_FAIL";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/order/create", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CREATE_ORDER_REQUEST, payload: err.response.data });
  }
};

// My Orders
export const myOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders/user");

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: MY_ORDERS_FAIL, payload: err.response.data });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: err.response.data });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
