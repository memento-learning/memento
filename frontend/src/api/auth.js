import axios from 'axios';

async function login(username, password) {
  const response = await axios.post('/api/auth/login', { username, password });
  return response.data.token;
}

async function signup(username, password) {
  await axios.post('/api/auth/signup', { username, password });
}

export default { signup, login };
