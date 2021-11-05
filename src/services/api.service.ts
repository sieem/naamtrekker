import { getToken, setToken } from './auth.service';

const baseUrl = globalThis.isProduction ? 'api' : 'http://localhost:3001/api';
const authHeaders = () => ({ Authorization: `bearer ${getToken()}` });

export const getOwnName = async (guid: string) => {
  const response = await fetch(`${baseUrl}/name/${guid}`);
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

export const login = async (name: string) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw await response.json()
  }

  const { token } = await response.json();
  setToken(token);
  return;
};

export const logout = async () => {
  const response = await fetch(`${baseUrl}/logout`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json', ...authHeaders() }
  });
  if (!response.ok) {
    throw await response.json()
  }

  return await response.json();
};