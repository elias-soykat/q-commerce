import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";

export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

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
