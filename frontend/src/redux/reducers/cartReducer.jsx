import {
  ADD_TO_CART,
  CLEAR_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../actions/cartAction";

const initialState = { cartItems: [], shippingInfo: {} };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const itemsExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (itemsExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemsExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case CLEAR_CART_ITEM:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
