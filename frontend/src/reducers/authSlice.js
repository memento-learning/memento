/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';

const initToken = localStorage.getItem('token');

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initToken,
    error: null,
    message: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
    error: (state, action) => {
      state.error = { message: action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    message: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const { actions } = authSlice;

export const selectToken = (state) => state.auth.token;
export const selectError = (state) => state.auth.error;
export const selectMessage = (state) => state.auth.message;

export const login = (username, password) => async (dispatch) => {
  try {
    const token = await authApi.login(username, password);
    localStorage.setItem('token', token);
    dispatch(actions.login(token));
    dispatch(actions.clearError());
    dispatch(actions.clearMessage());
  } catch (err) {
    dispatch(actions.error('Login Failed!'));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(actions.logout());
};

export default authSlice.reducer;
