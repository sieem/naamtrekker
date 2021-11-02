import { writable } from "svelte/store";

const tokenName = 'nameToken';

export const loggedIn = writable(false);

export const getToken = () => localStorage.getItem(tokenName);
export const setToken = (token: string) => {
  localStorage.setItem(tokenName, token);
  loggedIn.set(true);
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
  loggedIn.set(false);
};

export const setLoginState = () => loggedIn.set(!!localStorage.getItem(tokenName));