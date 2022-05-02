import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../actions/productAction";

const productsState = {
  products: [],
  pages: 0,
  total: 0,
  loading: false,
};
export function productsReducer(state = productsState, action) {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return { ...state, loading: true, products: state.products };

    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        total: action.payload.total,
      };

    case ALL_PRODUCT_FAIL:
      return { loading: true, err: action.payload };

    default:
      return state;
  }
}

export function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, product: state.product };

    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: true, err: action.payload };

    default:
      return state;
  }
}
