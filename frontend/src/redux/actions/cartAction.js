import axios from "axios";
import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  CART_ERROR,
  GET_CART_ITEMS_FAIL,
  GET_CART_ITEMS_REQUEST,
  GET_CART_ITEMS_SUCCESS,
  REMOVE_TO_CART,
  REMOVE_TO_CART_FAIL,
  REMOVE_TO_CART_REQUEST,
} from "../../constants/cartConstants";
import { fetchProduct } from "./productAction";

export const addCartItems = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/addtocart/${id}`,
      config
    );
    if (status === 200) {
      dispatch({ type: ADD_TO_CART, payload: data });
    }
   
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
  }
};

export const getCartItems = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_ITEMS_REQUEST });

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getcartlist`,
      config
    );

    if (status === 200) {
      dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: data.cart });
    }
  } catch (error) {
    dispatch({ type: GET_CART_ITEMS_FAIL, payload: error.message });
  }
};

export const removeCartItems = (id, token) => async (dispatch) => {
  try {
    dispatch({type:REMOVE_TO_CART_REQUEST});
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/removecartlist/${id}`,
      config
    );
    if (status === 200) {
      dispatch({ type: REMOVE_TO_CART, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: REMOVE_TO_CART_FAIL, payload: error.message });
  }
};
