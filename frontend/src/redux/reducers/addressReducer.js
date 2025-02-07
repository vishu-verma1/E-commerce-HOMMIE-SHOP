import { ADD_ADDRESS_FAIL, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, GET_ADDRESS_FAIL, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from "../../constants/addressConstants";

const initialAddressState = {
  loading: false,
  addresses: {} ,
  error: null,
};


const initialGetAddressState = {
  loading: false,
  addresses: {} ,
  message:"",
  error: null,
};

const initialUpdateAddressState = {
  loading: false,
  message:"",
  error: null,
};


export const addAddressReducer = (state = initialAddressState, action)=>{
    switch (action.type) {
      case ADD_ADDRESS_REQUEST :
        return {
          ...state,
          loading: true,
        };
      case ADD_ADDRESS_SUCCESS :
        return {
          ...state,
          loading: false,
          addresses: action.payload,
          error: "",
        };
      case ADD_ADDRESS_FAIL :
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default: {
        return state;
      }
    }
  }


export const getAddressReducer = (state = initialGetAddressState, action)=>{
    switch (action.type) {
      case GET_ADDRESS_REQUEST :
        return {
          ...state,
          loading: true,
          message:"",
        };
      case GET_ADDRESS_SUCCESS :
        return {
          ...state,
          loading: false,
          addresses: action.payload.addresses,
          message: action.payload.message,
          error: "",
        };
      case GET_ADDRESS_FAIL :
        return {
          ...state,
          loading: false,
          error: action.payload,
          message:"",
        };
  
      default: {
        return state;
      }
    }
  }


export const updateAddressReducer = (state = initialUpdateAddressState, action)=>{
    switch (action.type) {
      case UPDATE_ADDRESS_REQUEST :
        return {
          ...state,
          loading: true,
          message:"",
        };
      case UPDATE_ADDRESS_SUCCESS :
        return {
          ...state,
          loading: false,
          message: action.payload,
          error: "",
        };
      case UPDATE_ADDRESS_FAIL :
        return {
          ...state,
          loading: false,
          error: action.payload,
          message:"",
        };
  
      default: {
        return state;
      }
    }
  }