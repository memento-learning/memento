import axios from 'axios';

async function getDecks() {
  const { data } = await axios.get('/api/deck/');
  return data;
}

function createDeck({ name, description }) {
  return axios.post('/api/deck/create', { name, description });
}

async function getDeck(id) {
  const { data } = await axios.get(`/api/deck/${id}`);
  return data;
}

async function editDeckItems(deckId, items) {
  await axios.put(`/api/deck/${deckId}/edit`, items);
}

export default {
  getDecks, createDeck, getDeck, editDeckItems,
};
