import axios from 'axios';
import { HOST_NAME } from '../../../config';
const BASE_URL = `${HOST_NAME}/api/topics`;
import { Topic } from '../../../types';

const getById = async (id: string): Promise<Topic> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export default {
  getById
};
