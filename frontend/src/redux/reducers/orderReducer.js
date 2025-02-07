import {
  ORDER_FETCH_FAIL,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_SUCCESS,
  ORDER_ITEM_FAILS,
  ORDER_ITEM_REQUEST,
  ORDER_ITEM_SUCCESS,
} from "../../constants/orderConstants";

const initialOrderState = {
  order: null,
  error: null,
  loading: false,
};
const initialOrderListState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderItem = (state = initialOrderState, action) => {
  switch (action.type) {
    case ORDER_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.data,
      };

    case ORDER_ITEM_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload.data,
      };

    default:
      return {
        state,
      };
  }
};

export const orderListReducer = (state = initialOrderListState, action) => {
  switch (action.type) {
    case ORDER_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case ORDER_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
