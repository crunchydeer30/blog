import { AxiosError } from 'axios';
import storageService from '../services/storageService';
import toast from 'react-hot-toast';

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const generateHeaders = () => {
  return {
    Authorization: storageService.loadUser()
      ? `Bearer ${storageService.loadUser().token}`
      : null,
  };
};

export const errorToats = (e: unknown) => {
  if (e instanceof AxiosError) {
    toast.error(e.response?.data.error || 'Something went wrong');
  } else {
    toast.error('Something went wrong');
  }
};

export const generateError = (e: unknown) => {
  if (e instanceof AxiosError) {
    return e.response?.data.error || 'Something went wrong';
  } else {
    return 'Something went wrong';
  }
}

export const queryToString = (query: object) => {
  if (Object.keys(query).length === 0) return '';

  const queryString = Object.keys(query)
    .map((k) => k + '=' + query[k as keyof object])
    .join('&');

  return `?${queryString}`;
};

export const queryToQueryKey = (query: object) => {
  return Object.keys(query)
    .filter((key) => key !== 'pageSize' && key !== 'page')
    .map((key) => `${key}-${query[key as keyof object]}`);
};
