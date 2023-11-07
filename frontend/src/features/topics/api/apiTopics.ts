import axios from 'axios';
import { HOST_NAME } from '../../../config';
import { Topic } from '../../../types';
import { TopicQueryParams } from '../types';
import { queryToString } from '../../../utils';

const BASE_URL = `${HOST_NAME}/api/topics`;

const getById = async (id: string): Promise<Topic> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

const getAll = async (queryParams: TopicQueryParams = {}): Promise<Topic[]> => {
  const queryString = queryToString(queryParams);
  
  const response = await axios.get(`${BASE_URL}${queryString}`);
  return response.data;
}

export default {
  getAll,
  getById
};
