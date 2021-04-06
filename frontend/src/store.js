import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import deckReducer from './reducers/deckSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    deck: deckReducer,
  },
});
