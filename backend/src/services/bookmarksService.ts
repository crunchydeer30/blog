import prisma from '../db';
import createHttpError from 'http-errors';
import { PostItem } from '../types';

const bookmark = async (userId: string, postId: string) => {
  const exisitingBookmark = await prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        postId,
        userId,
      }
    }
  });

  if (exisitingBookmark) throw new createHttpError.BadRequest('Already bookmarked');

  const bookmark = await prisma.bookmark.create({
    data: {
      userId,
      postId,
    },
  });

  return bookmark;
};

const getAll = async (userId: string): Promise<PostItem[]> => {
  const bookmarks = await prisma.post.findMany({
    where: {
      bookmarkedBy: {
        some: {
          userId,
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
      }
    }
  });

  return bookmarks;
};

const getIDs = async (userId: string) => {
  const bookmarksIDs = await prisma.bookmark.findMany({
    where: {
      userId,
    },
    select: {
      postId: true,
    },
  });

  return bookmarksIDs;
};

const deleteById = async (userId: string, postId: string) => {
  const bookmarkToDelete = await prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        postId,
        userId,
      }
    }
  });

  if (!bookmarkToDelete) throw new createHttpError.NotFound('Bookmark not found');

  await prisma.bookmark.delete({
    where: {
      userId_postId: {
        postId,
        userId,
      }
    }
  });
};

export default { bookmark, getAll, deleteById, getIDs };
