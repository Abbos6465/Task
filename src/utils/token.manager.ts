import { getItem, removeItem, setItem } from "@/utils/localStorage";

const accessTokenKey = "access_token";

export const setAccessToken = (token: string) => {
  setItem(accessTokenKey, token);
};

export const getAccessToken = () => {
  return getItem(accessTokenKey);
};

export const removeAccessToken = () => {
  return removeItem(accessTokenKey);
};
