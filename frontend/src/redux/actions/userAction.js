import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAIL = "LOAD_USER_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

// Login
export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.message });
  }
};

// Register
export const registerAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.message });
  }
};

// Load User
export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/user");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL, payload: err.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem("userInfo");
  } catch (err) {}
};
