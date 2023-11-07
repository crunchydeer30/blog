import axios from 'axios';

import { generateHeaders } from '../../../utils';
import { HOST_NAME } from '../../../config';
import { Subscription, UserItem } from '../types';

const BASE_URL_SUBSCRIPTIONS = `${HOST_NAME}/api/subscriptions`;
const BASE_URL_USERS = `${HOST_NAME}/api/users`;

const follow = async (id: string): Promise<Subscription> => {
  const headers = generateHeaders();

  const response = await axios.post(`${BASE_URL_SUBSCRIPTIONS}/${id}`, {}, { headers });
  return response.data;
};

const unfollow = async (userId: string): Promise<void> => {
  const headers = generateHeaders();

  const response = await axios.delete(`${BASE_URL_SUBSCRIPTIONS}/${userId}`, { headers });
  return response.data;
};

const getFollowers = async (userId: string): Promise<UserItem[]> => {
  const response = await axios.get(`${BASE_URL_USERS}/${userId}/followers`);
  return response.data;
}

const getFollowing = async (userId: string): Promise<UserItem[]> => {
  const response = await axios.get(`${BASE_URL_USERS}/${userId}/following`);
  return response.data;
}

const getSubscriptions = async (): Promise<Subscription[]> => {
  const headers = generateHeaders();
  if (!headers.Authorization) throw new Error('Not Authorized');
  
  const response = await axios.get(BASE_URL_SUBSCRIPTIONS, { headers });
  return response.data;
}

export default {
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  getSubscriptions
};
