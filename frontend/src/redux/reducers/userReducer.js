import { PRODUCT_FETCH_REQUEST } from "../../constants/productConstants";
import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PROFILEPICTURE_FAIL,
  PROFILEPICTURE_REQUEST,
  PROFILEPICTURE_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SET_TOKEN,
  UNSET_TOKEN,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../../constants/userConstant";

const initialAuthState = {
  token: '',
  user:{}
};

const initialState = {
  loading: false,
  user: {},
  error: null,
};

const initialUserUpdateState = {
  loading: false,
  user: {},
  error: null,
}

const initialLoginState = {
  loading: false,
  user: {},
  error: null,
};

const initialProfileState = {
  loading: false,
  user: {},
  error: null,
};

const initialProfilePictureState = {
  loading: false,
  message: null ,
  error: null,
};

 const initialPasswordState ={
  loading: false,
  message: "" ,
  error: null,
 }




export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
      };

    default: {
      return state;
    }
  }
};

export const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
      };

    default: {
      return state;
    }
  }
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case UNSET_TOKEN:
      return {
        ...state,
        token: '',
        user:{}
      };

    default:
      return state;
  }
};

export const profileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case GET_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateReducer = (state= initialUserUpdateState, action)=>{
  switch (action.type) {
    case UPDATE_USER_REQUEST :
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS :
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case UPDATE_USER_FAIL :
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
      };

    default: {
      return state;
    }
  }
}


export const profilePictureUpdateReducer = (state = initialProfilePictureState, action)=>{
  switch (action.type) {
    case PROFILEPICTURE_REQUEST :
      return {
        ...state,
        loading: true,
      };
    case PROFILEPICTURE_SUCCESS :
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
      };
    case PROFILEPICTURE_FAIL :
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

export const passwordUpdateReducer = (state = initialPasswordState, action)=>{
  switch (action.type) {
    case UPDATE_USER_REQUEST :
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS :
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
      };
    case UPDATE_USER_FAIL :
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

