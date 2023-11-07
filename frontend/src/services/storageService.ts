import { SignedInUser } from "../features/authentication/types";
const KEY = 'user';

const saveUser = (user: SignedInUser) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

const loadUser = () => {
  const user = window.localStorage.getItem(KEY);
  return user ? JSON.parse(user) : null;
};

const removeUser = () => {
  localStorage.removeItem(KEY);
};

export default {
  saveUser,
  loadUser,
  removeUser,
};
