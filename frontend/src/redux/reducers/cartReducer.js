import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  CART_ERROR,
  GET_CART_ITEMS_FAIL,
  GET_CART_ITEMS_REQUEST,
  GET_CART_ITEMS_SUCCESS,
  REMOVE_TO_CART,
} from "../../constants/cartConstants";

const initalCartState = {
  message: null,
  error: null,
  loading: false,
};

const initalGetCartState = {
  cart: null,
  error: null,
  loading: false,
};

export const cartReducer = (state = initalCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case REMOVE_TO_CART:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case CART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getCartReducer = (state = initalCartState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };

    case GET_CART_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state ;
  }
};
