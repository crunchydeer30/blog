import axios from 'axios';

import { generateHeaders } from '../../../utils';
import { SignInCredentials, SignUpCredentials, SignedInUser } from '../types';
import storageService from '../../../services/storageService';
import { HOST_NAME } from '../../../config';

const BASE_URL = `${HOST_NAME}/api/auth`;

const headers = {
  'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}

const signIn = async (credentials: SignInCredentials): Promise<SignedInUser> => {
  const response = await axios.post(BASE_URL, credentials, {headers});
  return response.data;
};

const signUp = async (credentials: SignUpCredentials) => {
  const response = await axios.post(`${HOST_NAME}/api/users`, credentials);
  return response.data;
};


const getSignedInUser = async (user: SignedInUser | undefined | null): Promise<SignedInUser | null> => {
  if (!user) return null;
  
  const headers = generateHeaders();

  try {
    const response = await axios.get(`${BASE_URL}/validate`, { headers });
    return response.data;
  } catch (e) {
    storageService.removeUser();
    return null;
  }
}

export default {
  signIn,
  signUp,
  getSignedInUser
};