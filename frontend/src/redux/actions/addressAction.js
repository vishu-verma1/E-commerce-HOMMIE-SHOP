import { ADD_ADDRESS_FAIL, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, GET_ADDRESS_FAIL, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from "../../constants/addressConstants";
import axios from "axios"

export const addAddressAction = (address, token) => async (dispatch) => {
    try {
      dispatch({ type: ADD_ADDRESS_REQUEST });

    

      const config = { headers: { Authorization: `Bearer ${token}`} };

      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/address`,address, config);

     
      if (status == 200) {
        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data.addresses });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      dispatch({ type: ADD_ADDRESS_FAIL, payload: errorMessage });
    }
  };

export const getAddressAction = (token) => async (dispatch) => {
    try {
      dispatch({ type: GET_ADDRESS_REQUEST });
      
      
      
      const config = { headers: { Authorization: `Bearer ${token}`} };
      
      const { data, status } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getaddress`,config);
        
     
      if (status == 200) {
        dispatch({ type: GET_ADDRESS_SUCCESS, payload: {addresses: data.addresses, message: data.message} });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      dispatch({ type: GET_ADDRESS_FAIL, payload: errorMessage });
    }
  };



export const updateAddressAction = (updateAddress, token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ADDRESS_REQUEST });
      
      
      
      const config = { headers: { Authorization: `Bearer ${token}`} };
      
      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/addressupdate`,updateAddress,config);
        
     
      if (status == 200) {
        dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data.message });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      dispatch({ type: UPDATE_ADDRESS_FAIL, payload: errorMessage });
    }
  };