import {
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_TOKEN,
  UNSET_TOKEN,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  PROFILEPICTURE_REQUEST,
  PROFILEPICTURE_SUCCESS,
  PROFILEPICTURE_FAIL,
} from "../../constants/userConstant";
import axios from "axios";
import { persistor } from "../../store.js";

export const register = (newUser) => async (dispatch) => {
  try {
    // console.log(newUser)
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data, status } = await axios.post(
      "http://localhost:3000/user/signup",
      newUser,
      config
    );

    if (status == 201) {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
      dispatch({
        type: SET_TOKEN,
        payload: { token: data.token, user: data.user },
      });
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    dispatch({ type: REGISTER_USER_FAIL, payload: errorMessage });
  }
};

export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data, status } = await axios.post(
      "http://localhost:3000/user/login",
      user,
      config
    );

    if (status == 201) {
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      dispatch({
        type: SET_TOKEN,
        payload: { token: data.token, user: data.user },
      });
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    dispatch({ type: LOGIN_FAIL, payload: errorMessage });
  }
};

export const logout = (token) => async (dispatch) => {
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/logout`, config)
      .then((respons) => {
        if (respons.status === 200) {
          dispatch({ type: UNSET_TOKEN });
          persistor.pause();
          persistor.flush().then(() => {
            return persistor.purge();
          });
        }
      });
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    console.log(errorMessage);
  }
};

export const getProfile = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      config
    );
    if (status === 200) {
      dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAIL, payload: error.message });
  }
};

export const updateUserAction = (user, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/update`,
      user,
      config
    );

    if (status == 200) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    dispatch({ type: UPDATE_USER_FAIL, payload: errorMessage });
  }
};

export const profilePictureUpdateAction =
  (image, token) => async (dispatch) => {
    try {
      dispatch({ type: PROFILEPICTURE_REQUEST });

      const formData = new FormData();
      formData.append("image", image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/profilepic`,
        formData,
        config
      );

      // console.log(data)
      if (status == 200) {
        dispatch({ type: PROFILEPICTURE_SUCCESS, payload: data.data });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      dispatch({ type: PROFILEPICTURE_FAIL, payload: errorMessage });
    }
  };

export const passwordUpdateAction = (password, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/updatepassword`,
      password,
      config
    );

    
    if (status === 200) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.message });
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    dispatch({ type: UPDATE_USER_FAIL, payload: errorMessage });
  }
};
