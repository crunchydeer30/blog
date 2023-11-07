import axios from 'axios';

import { PostItem } from '../../posts/types';
import { HOST_NAME } from '../../../config';
import { generateHeaders } from '../../../utils';

import { Bookmark } from '../../../types';


const BASE_URL = `${HOST_NAME}/api/bookmarks`;

const create = async (postId: string) => {
  const header = generateHeaders();

  const response = await axios.post(
    `${BASE_URL}/${postId}`,
    {},
    { headers: header }
  );
  return response.data;
};

const getAll = async (): Promise<PostItem[]> => {
  const headers = generateHeaders();
  if(!headers.Authorization) throw new Error('Sign In to add bookmarks');

  const response = await axios.get(BASE_URL, { headers });
  return response.data;
};

const getIDs = async (): Promise<Bookmark[]> => {
  const headers = generateHeaders();
  if(!headers.Authorization) throw new Error('Sign In to add bookmarks');

  const response = await axios.get(`${BASE_URL}/IDs`, { headers });
  
  return response.data;
}

const deleteById = async (postId: string) => {
  const header = generateHeaders();

  const response = await axios.delete(`${BASE_URL}/${postId}`, {
    headers: header,
  });
  
  return response.data;
};

export default { create, getAll, deleteById, getIDs };
