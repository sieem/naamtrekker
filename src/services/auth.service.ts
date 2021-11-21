import { writable } from 'svelte/store';
import { getOwnName } from './api.service';
const tokenName = 'nameToken';


export const nameStore = writable<string>();
export const getGuid = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get('guid');
}
export const setName = async () => {
  const guid = getGuid();

  if (!guid) {
    return;
  }

  const { name } = await getOwnName(guid);
  nameStore.set(name);
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
};
