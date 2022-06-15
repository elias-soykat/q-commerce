import axios from "axios";

export const CLEAR_ERRORS = "CLEAR_ERRORS";

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
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";
export const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";
export const UPDATE_PASSWORD_RESET = "UPDATE_PASSWORD_RESET";

export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST";
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS";
export const FORGET_PASSWORD_FAIL = "FORGET_PASSWORD_FAIL";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

export const ALL_USERS_REQUEST = "ALL_USERS_REQUEST";
export const ALL_USERS_SUCCESS = "ALL_USERS_SUCCESS";
export const ALL_USERS_FAIL = "ALL_USERS_FAIL";

export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAIL = "USER_DETAILS_FAIL";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
export const UPDATE_USER_RESET = "UPDATE_USER_RESET";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";
export const DELETE_USER_RESET = "DELETE_USER_RESET";

// Login
export const loginAction = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    localStorage.setItem("userLogin", JSON.stringify(getState().user));
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data });
  }
};

// Register
export const registerAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};

// Load User
export const loadUserAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/user");

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });

    localStorage.setItem("userLogin", JSON.stringify(getState().user));
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL, payload: err.response.data });
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({ type: LOGOUT_SUCCESS, payload: true });

    localStorage.removeItem("userLogin");
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL, payload: err.response.data });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/api/v1/user/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data });
  }
};

// Update Password
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_FAIL });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/update`,
      password,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: err.response.data });
  }
};

// Forget Password
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/password/forget`, email, config);

    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({ type: FORGET_PASSWORD_FAIL, payload: err.response.data });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );
    console.log(data);
    dispatch({ type: RESET_PASSWORD_REQUEST, payload: data });
  } catch (err) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: err.response.data });
  }
};

// Get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ALL_USERS_FAIL, payload: err.response.data });
  }
};

// Get user details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: USER_DETAILS_FAIL, payload: err.response.data });
  }
};

// Update user
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: UPDATE_USER_FAIL, payload: err.response.data });
  }
};

// Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: DELETE_USER_FAIL, payload: err.response.data });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
