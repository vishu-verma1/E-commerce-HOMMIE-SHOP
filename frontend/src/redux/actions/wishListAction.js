import axios from "axios";
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
import { fetchProduct } from "./productAction";

export const addWhishList = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_WHISHLIST_REQUEST });

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/addtowishlist/${id}`,
      config
    );
    
    if (status === 200) {
      dispatch({ type: ADD_TO_WHISHLIST, payload: data.message });
      dispatch(fetchProduct({}));
    }
  } catch (error) {
    dispatch({ type: WHISHLIST_ERROR, payload: error.message });
  }
};

export const getWishlistItems = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_WHISHLIST_ITEMS_REQUEST });

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getwishlist`,
      config
    );


    if(status === 200){
        dispatch({type:GET_WHISHLIST_ITEMS_SUCCESS, payload:data.wishList})
    }

  } catch (error) {
    dispatch({ type: GET_WHISHLIST_ITEMS_FAIL, payload: error.message });
  }
};


export const removeWishlistItems = (id,token) => async (dispatch) => {
  try {

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/removewishlist/${id}`,
      config
    );
    
    if (status === 200) {
      dispatch({ type: REMOVE_TO_WHISHLIST, payload: data.message });
      dispatch(fetchProduct({}));
    }
  } catch (error) {
    dispatch({ type: REMOVE_TO_WHISHLIST_FAIL, payload: error.message });
  }
};