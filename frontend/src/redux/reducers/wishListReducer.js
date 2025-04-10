import {
  ADD_TO_WHISHLIST,
  ADD_TO_WHISHLIST_REQUEST,
  GET_WHISHLIST_ITEMS_FAIL,
  GET_WHISHLIST_ITEMS_REQUEST,
  GET_WHISHLIST_ITEMS_SUCCESS,
  REMOVE_TO_WHISHLIST,
  REMOVE_TO_WHISHLIST_FAIL,
  WHISHLIST_ERROR,
} from "../../constants/wishListConstants";

const initalWishListState = {
  message: null,
  error: null,
  loading: false,
};

const initalGetWishlistState = {
  wishlist: null,
  error: null,
  loading: false,
};

const initalRemoveWishListState = {
  message: null,
  error: null,
};

export const wishListReducer = (state = initalWishListState, action) => {
  switch (action.type) {
    case ADD_TO_WHISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_WHISHLIST:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case WHISHLIST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getWishlistReducer = (state = initalGetWishlistState, action) => {
  switch (action.type) {
    case GET_WHISHLIST_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_WHISHLIST_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload,
      };

    case GET_WHISHLIST_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const removeWishListReducer = (
  state = initalRemoveWishListState,
  action
) => {
  switch (action.type) {
    case initalRemoveWishListState:
      return {
        ...state,
        message: action.payload,
      };

    case REMOVE_TO_WHISHLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default: return state;
  }
};
