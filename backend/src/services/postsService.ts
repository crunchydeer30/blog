import { PostItem } from '../types';
import prisma from '../db';
import createPostDto from '../dto/createPostDto';
import createHttpError from 'http-errors';
import { uploadImage } from '../utils/cloudinary';
import { createPaginator } from 'prisma-pagination';
import { parsePaginationQuery } from '../utils/parsers';

const buildPostQuery = (query: object) => {
  const params = [];

  if ('q' in query)
    params.push({ title: { contains: query.q as string, mode: 'insensitive' as const } });
  if ('author' in query)
    params.push({ author: { id: query.author as string } });
  if ('topic' in query)
    params.push({ topic: { id: query.topic as string } });

  return { params: { AND: params } };
};

const getAll = async (query: object) => {
  const { params } = buildPostQuery(query);
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

const getFollowing = async (userId: string, query: object) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const paginationOptions = parsePaginationQuery(query);
  const paginate = createPaginator({ perPage: paginationOptions.take });

  if (!user) throw new createHttpError.NotFound('User not found');

  const posts = await paginate(
    prisma.post,
    {
      where: {
        author: {
          followedBy: {
            some: {
              followerId: user.id,
            },
          },
        },
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

const getById = async (id: string): Promise<PostItem> => {
  const post = await prisma.post.findUnique({
    where: {
      id,
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
  });

  if (!post) {
    throw new createHttpError.NotFound('Post not found');
  }

  return post;
};

const create = async (data: createPostDto, authorId: string) => {
  const { title, description, content, topicId, thumbnail, header } = data;
  console.log('Data unpacked');
  console.log('Prisma started');
  
  const newPost = await prisma.post.create({
    data: {
      title,
      description,
      content,
      authorId,
      topicId,
      thumbnail: (await uploadImage(thumbnail)).url,
      header: (await uploadImage(header)).url,
    },
  });

  console.log('Prisma finished');
  
  return newPost;
};

const deleteById = async (id: string) => {
  const postToDelete = await getById(id);

  if (!postToDelete) {
    throw new createHttpError.NotFound('Post not found');
  }

  await prisma.post.delete({
    where: {
      id,
    },
  });
};

export default { getAll, getFollowing, create, getById, deleteById };
