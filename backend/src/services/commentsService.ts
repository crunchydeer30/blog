import createHttpError from 'http-errors';
import prisma from '../db';
import { Comment } from '@prisma/client';
import CreateCommentDto from '../dto/createCommentDto';

const getAll = async (): Promise<Comment[]> => {
  const comments = await prisma.comment.findMany();
  return comments;
};

const getById = async (id: string): Promise<Comment> => {
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if (!comment) throw new createHttpError.NotFound('Comment not found');
  return comment;
};

const getByPostId = async (postId: string): Promise<Comment[]> => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) throw new createHttpError.NotFound('Post not found');

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return comments;
};

const deleteById = async (id: string, userId: string) => {
  await prisma.comment.delete({
    where: {
      id,
      userId,
    },
  });
};

const create = async (
  data: CreateCommentDto,
  postId: string,
  userId: string
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) throw new createHttpError.NotFound('Post not found');

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) throw new createHttpError.NotFound('User not found');

  const comment = await prisma.comment.create({
    data: {
      ...data,
      postId,
      userId,
    },
  });

  return comment;
};

export default { getAll, getById, getByPostId, create, deleteById };
