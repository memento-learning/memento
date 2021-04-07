/* eslint no-param-reassign: 0 */
import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import axios from 'axios';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './store';
import { logout } from './reducers/authSlice';

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    store.dispatch(logout());
  }
  return error;
});

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
