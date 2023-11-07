import prisma from '../db';
import { parsePaginationQuery } from '../utils/parsers';
import { createPaginator } from 'prisma-pagination';

const buildSearchQuery = (query: object) => {
  const params = [];

  if ('q' in query) params.push({ title: { contains: query.q as string } });

  return { params: { AND: params } };
};

const searchPosts = async (query: object) => {
  const { params } = buildSearchQuery(query);
  const paginationOptions = parsePaginationQuery(query);
  const paginate = createPaginator({ perPage: paginationOptions.take });

  const posts = await paginate(
    prisma.post,
    {
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        ...params,
      },
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
            profileImage: true,
          },
        },
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    },
    { page: paginationOptions.page }
  );

  return posts;
};

export default { searchPosts };