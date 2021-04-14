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

export default { getDecks, createDeck, getDeck };
