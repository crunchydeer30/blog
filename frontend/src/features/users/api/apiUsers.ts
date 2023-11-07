import axios from 'axios';
import { HOST_NAME } from '../../../config';
import { UserQueryParams } from '../types';
import { queryToString } from '../../../utils';
import { PaginatedUserItems } from '../types';

const BASE_URL = `${HOST_NAME}/api/users`;

const getAll = async (queryParams: UserQueryParams = {}): Promise<PaginatedUserItems> => {
  const queryString = queryToString(queryParams);

  const response = await axios.get(`${BASE_URL}${queryString}`);
  return response.data;
};

export default {
  getAll,
};
