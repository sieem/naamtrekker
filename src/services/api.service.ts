import { getGuid } from "./auth.service";

const baseUrl = globalThis.isProduction ? 'api' : 'http://localhost:3001/api';
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
