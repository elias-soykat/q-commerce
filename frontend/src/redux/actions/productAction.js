import axios from "axios";
import { CLEAR_ERRORS } from "./userAction";

export const ALL_PRODUCT_REQUEST = "ALL_PRODUCT_REQUEST";
export const ALL_PRODUCT_SUCCESS = "ALL_PRODUCT_SUCCESS";
export const ALL_PRODUCT_FAIL = "ALL_PRODUCT_FAIL";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";

export const NEW_REVIEW_REQUEST = "NEW_REVIEW_REQUEST";
export const NEW_REVIEW_SUCCESS = "NEW_REVIEW_SUCCESS";
export const NEW_REVIEW_FAIL = "NEW_REVIEW_FAIL";

export const ADMIN_PRODUCT_REQUEST = "ADMIN_PRODUCT_REQUEST";
export const ADMIN_PRODUCT_SUCCESS = "ADMIN_PRODUCT_SUCCESS";
export const ADMIN_PRODUCT_FAIL = "ADMIN_PRODUCT_FAIL";

export const NEW_PRODUCT_REQUEST = "NEW_PRODUCT_REQUEST";
export const NEW_PRODUCT_SUCCESS = "NEW_PRODUCT_SUCCESS";
export const NEW_PRODUCT_FAIL = "NEW_PRODUCT_FAIL";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAIL = "DELETE_PRODUCT_FAIL";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAIL = "UPDATE_PRODUCT_FAIL";

// Get all Product Details
export const getProducts =
  (pageNumber = 1, keyword = "", category = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link1 = `/api/v1/products?page=${pageNumber}&keyword=${keyword}`;
      let link2 = `/api/v1/products?page=${pageNumber}&keyword=${keyword}&category=${category}`;

      let getLink = category ? link2 : link1;

      const { data } = await axios.get(getLink);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ALL_PRODUCT_FAIL, payload: err.response.data });
    }
  };

// Create Product (admin)
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/product/create",
      productData,
      config
    );

    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data, success: true });
  } catch (err) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: err.response.data });
  }
};

// Update Product (admin)
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/product/update/${id}`,
      productData,
      config
    );

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data, success: true });
  } catch (err) {
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: err.response.data });
  }
};

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.response.data });
  }
};

// New Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: err.response.data });
  }
};

// Get all Product Details(Admin)
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADMIN_PRODUCT_FAIL, payload: err.response.data });
  }
};

// Delete single product
export const deleteSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/delete/${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: err.response.data });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
