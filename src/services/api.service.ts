import { getGuid } from "./auth.service";

const baseUrl = import.meta.env.MODE === 'production' ? 'api' : 'http://localhost:3002/api';
const authHeaders = () => ({ guid: getGuid() });

export const getOwnName = async (guid: string) => {
  const response = await fetch(`${baseUrl}/my-name`, { headers: authHeaders() });
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json();
};

export const seeName = async () => {
  const response = await fetch(`${baseUrl}/chosen-name`, { headers: authHeaders() });
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json();
};
