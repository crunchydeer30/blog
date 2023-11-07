import axios from 'axios';
import { HOST_NAME } from '../../../config';
import { UserProfile } from '../types';
import { UpdateProfileInfo } from '../types';
import { generateHeaders } from '../../../utils';

const BASE_URL = `${HOST_NAME}/api/users`;

const getById = async (id: string): Promise<UserProfile> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}

const updateProfile = async (profileId: string, data: UpdateProfileInfo): Promise<UserProfile> => {
  const headers = generateHeaders();

  const response = await axios.put(`${BASE_URL}/${profileId}/profile`, data, { headers });
  return response.data;
}

export default { getById, updateProfile };