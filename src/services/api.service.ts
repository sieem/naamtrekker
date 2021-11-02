import { getToken, setToken } from './auth.service';

const baseUrl = globalThis.isProduction ? 'api' : 'http://localhost:3001/api';
const authHeaders = () => ({ Authorization: `bearer ${getToken()}` });

export const getNames = async () => {
  const response = await fetch(`${baseUrl}/names`);
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json();
};

export const seeName = async () => {
  const response = await fetch(`${baseUrl}/name`, { headers: authHeaders() });
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json();
};

export const login = async (chosenName: string) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chosenName }),
  });
  if (!response.ok) {
    throw await response.json()
  }

  const { token } = await response.json();
  setToken(token);
  return;
};