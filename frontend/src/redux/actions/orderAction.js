import axios from "axios";
import {
  ORDER_FETCH_FAIL,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_SUCCESS,
  ORDER_ITEM_FAILS,
  ORDER_ITEM_REQUEST,
  ORDER_ITEM_SUCCESS,
} from "../../constants/orderConstants";

export const orderItems = (order, token) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_ITEM_REQUEST });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/products/order`,
      order,
      config
    );
    if (status === 200) {
      dispatch({ type: ORDER_ITEM_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: ORDER_ITEM_FAILS, payload: error.message });
  }
};

export const orderList = (token) => async (dispatch) => {
  try {
    dispatch({type:ORDER_FETCH_REQUEST})
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/orderlist`,
      config
    );
    if (status === 200) {
      dispatch({ type: ORDER_FETCH_SUCCESS, payload: data.orders });
    }
  } catch (error) {
    dispatch({ type: ORDER_FETCH_FAIL, payload: error.message });
  }
};
