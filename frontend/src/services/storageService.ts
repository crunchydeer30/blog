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

const getSearchHistory = (): string[] => {
  const searchHistory = localStorage.getItem('searchHistory');
  return searchHistory ? JSON.parse(searchHistory) : [];
}

const saveSearchQuery = (query: string) => {
  let searchHistory = getSearchHistory();
  if (!searchHistory.includes(query) && query.length) searchHistory = [query, ...searchHistory];
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
};

const removeSearchQuery = (query: string) => {
  const searchHistory = getSearchHistory().filter(q => q !== query);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

export default {
  saveUser,
  loadUser,
  removeUser,
  getSearchHistory,
  saveSearchQuery,
  removeSearchQuery
};
