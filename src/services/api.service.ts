import { getToken, setToken } from './auth.service';

const baseUrl = globalThis.isProduction ? 'api' : 'http://localhost:3001/api';
const authHeaders = () => ({ Authorization: `bearer ${getToken()}` });

export const getName = async () => {
  const response = await fetch(`${baseUrl}/name`, { headers: authHeaders() });
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json();
};

export const takeName = async (user: string) => {
  const response = await fetch(`${baseUrl}/name`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
  });
  if (!response.ok) {
    throw await response.json()
  }

  const { token } = await response.json();
  setToken(token);
  return;
};