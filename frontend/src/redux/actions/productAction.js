import axios from "axios";

export const ALL_PRODUCT_REQUEST = "ALL_PRODUCT_REQUEST";
export const ALL_PRODUCT_SUCCESS = "ALL_PRODUCT_SUCCESS";
export const ALL_PRODUCT_FAIL = "ALL_PRODUCT_FAIL";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";

export const getProducts =
  (pageNumber = 1, keyword = "", category = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link1 = `/api/v1/products?page=${pageNumber}&keyword=${keyword}`;
      let link2 = `/api/v1/products?page=${pageNumber}&keyword=${keyword}&category=${category}`;

      let getLink = category ? link2 : link1;

      const { data } = await axios.get(getLink);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: err.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.message,
    });
  }
};
