import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";

export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

export const SAVE_SHIPPING_INFO = "SAVE_SHIPPING_INFO";

export const CLEAR_CART_ITEM = "CLEAR_CART_ITEM";

// Add to cart
export const addItemsCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      price: data.price,
      image: data.images[0].url,
      stock: data.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//  Remove from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save shipping Info
export const saveShippingInfo = (shippingData) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: shippingData });

  localStorage.setItem("shippingInfo", JSON.stringify(shippingData));
};
