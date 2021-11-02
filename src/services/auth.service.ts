import { writable } from "svelte/store";

export const loggedIn = writable(false);

export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => {
  localStorage.setItem('token', token);
  loggedIn.set(true);
};

export const setLoginState = () => loggedIn.set(!!localStorage.getItem('token'));