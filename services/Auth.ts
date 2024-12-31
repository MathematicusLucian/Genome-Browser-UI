import { jwtDecode } from "jwt-decode";
// import { AUTH_TOKEN_KEY, BASE_URL } from "./constant";
const AUTH_TOKEN_KEY = '';
const BASE_URL = '';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../services/LocalStorage";
import axiosInstance from "../state/base/axiosInstance";

export const storeUserInfo = (token) => {
  return setToLocalStorage(AUTH_TOKEN_KEY, token);
};

export const getUserInfo = () => {
  const accessToken = getFromLocalStorage(AUTH_TOKEN_KEY);

  if (accessToken) {
    const userData = jwtDecode(accessToken);
    return userData;
  } else {
    return null;
  }
};

export const isUserLoggedIn = () => {
  const accessToken = getFromLocalStorage(AUTH_TOKEN_KEY);

  if (accessToken) {
    return true;
  } else {
    return false;
  }
};

export const removeUserInfo = () => {
  return removeFromLocalStorage(AUTH_TOKEN_KEY);
};

export const getNewAccessToken = async () => {
  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return await response.json();
};

export const logout = async () => {
  await axiosInstance.post(`${BASE_URL}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};