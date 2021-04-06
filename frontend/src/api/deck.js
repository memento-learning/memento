import axios from 'axios';

async function getDecks() {
  const response = await axios.get('/api/deck/');
  return response.data;
}

async function createDeck(name, description) {
  await axios.post('/api/deck/create', { name, description });
}

export default { getDecks, createDeck };
