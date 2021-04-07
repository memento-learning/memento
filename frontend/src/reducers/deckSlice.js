/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import deckApi from '../api/deck';

export const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    decks: [],
  },
  reducers: {
    load: (state, action) => {
      state.decks = action.payload;
    },
  },
});

export const { actions } = deckSlice;

export const selectDecks = (state) => state.deck.decks;

export const loadDecks = () => async (dispatch) => {
  try {
    const decks = await deckApi.getDecks();
    dispatch(actions.load(decks));
  } catch (err) {
    console.log('Error loading decks');
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(actions.logout());
};

export default deckSlice.reducer;
