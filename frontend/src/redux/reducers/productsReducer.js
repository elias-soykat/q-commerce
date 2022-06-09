import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../actions/productAction";
import { CLEAR_ERRORS } from "../actions/userAction";

const productsState = {
  products: [],
  pages: 0,
  total: 0,
  loading: false,
};

// All Products
export function productsReducer(state = productsState, action) {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return { ...state, loading: true, products: state.products };

    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        total: action.payload.total,
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return { loading: true, err: action.payload };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Single Product Details
export function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: true, err: action.payload };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Single Product Details
export function newReviewReducer(state = {}, action) {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return { ...state, loading: true };

    case NEW_REVIEW_SUCCESS:
      return { ...state, loading: false, success: action.payload };

    case NEW_REVIEW_FAIL:
      return { ...state, loading: true, err: action.payload };

    case NEW_REVIEW_RESET:
      return { ...state, success: false };

    case CLEAR_ERRORS:
      return { ...state, err: null };

    default:
      return state;
  }
}
