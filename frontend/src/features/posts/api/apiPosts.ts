import axios from 'axios';
import { PaginatedPostItems, PostItem, PostQueryParams } from '../types';
import { Post } from '../../../types';
import { CreatePostInfo } from '../types';
import { HOST_NAME } from '../../../config';
import { generateHeaders } from '../../../utils';
import { queryToString } from '../../../utils';

const BASE_URL = `${HOST_NAME}/api/posts`;

const getAll = async (
  queryParams: PostQueryParams = {}
): Promise<PaginatedPostItems> => {
  const queryString = queryToString(queryParams);

  const response = await axios.get(`${BASE_URL}${queryString}`);
  return response.data;
};

const getById = async (id: string): Promise<PostItem> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

const getFollowing = async (
  queryParams: PostQueryParams = {}
): Promise<PaginatedPostItems> => {
  const headers = generateHeaders();
  if (!headers.Authorization) throw new Error('Sign In to follow authors');

  const queryString = queryToString(queryParams);

  const response = await axios.get(`${BASE_URL}/following${queryString}`, {
    headers,
  });
  return response.data;
};

const create = async (post: CreatePostInfo): Promise<Post> => {
  const headers = generateHeaders();

  const response = await axios.post(BASE_URL, post, { headers });
  return response.data;
};

export default {
  getAll,
  getFollowing,
  create,
  getById,
};
