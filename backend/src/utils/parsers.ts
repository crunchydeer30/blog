import { UserToken } from '../types';
import createHttpError from 'http-errors';

export const parseToken = (token: unknown) => {
  if (token && typeof token == 'object' && 'userId' in token && 'username' in token && 'role' in token) {
    return token as UserToken;
  }
  throw new createHttpError.Unauthorized('Invalid token');
};

export const parsePaginationQuery = (query: object) => {
  let take: number | undefined = undefined;
  let page = 1;

  if ('pageSize' in query && typeof query.pageSize === 'string' && !isNaN(+query.pageSize) && +query.pageSize > 0) {
    take = +query.pageSize;
    if ('page' in query && typeof query.page === 'string' && !isNaN(+query.page) && +query.page > 0) {
      page = +query.page;
    }
  }
    
  return { take, page };
};
