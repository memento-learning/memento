import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import axios from 'axios';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './store';

axios.defaults.withCredentials = true;

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
