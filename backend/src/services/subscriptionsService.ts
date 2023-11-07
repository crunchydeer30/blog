import prisma from '../db';
import createHttpError from 'http-errors';
import { UserItem } from '../types';

const getAll = async (userId: string) => {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      followerId: userId,
    },
  });

  return subscriptions;
};

const follow = async (followerId: string, followingId: string) => {
  const follower = await prisma.user.findUnique({
    where: {
      id: followerId,
    },
  });

  const following = await prisma.user.findUnique({
    where: {
      id: followingId,
    },
  });

  if (!follower || !following)
    throw new createHttpError.NotFound('User not found');

  const subscription = await prisma.subscription.create({
    data: {
      followerId,
      followingId,
    },
  });

  return subscription;
};

const unfollow = async (followerId: string, followingId: string) => {
  const follower = await prisma.user.findUnique({
    where: {
      id: followerId,
    },
  });

  const following = await prisma.user.findUnique({
    where: {
      id: followingId,
    },
  });

  if (!follower || !following)
    throw new createHttpError.NotFound('User not found');

  return await prisma.subscription.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
};

const getFollowers = async (userId: string): Promise<UserItem[]> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new createHttpError.NotFound('User not found');

  const subscriptions = await prisma.user.findMany({
    where: {
      following: {
        some: {
          followingId: user.id,
        },
      },
    },
    select: {
      id: true,
      displayName: true,
      profileImage: true,
      personalInfo: true,
    },
  });

  return subscriptions;
};

const getFollowing = async (userId: string): Promise<UserItem[]> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new createHttpError.NotFound('User not found');

  const subscriptions = await prisma.user.findMany({
    where: {
      followedBy: {
        some: {
          followerId: user.id,
        },
      },
    },
    select: {
      id: true,
      displayName: true,
      profileImage: true,
      personalInfo: true,
    },
  });

  return subscriptions;
};

export default { getAll, follow, unfollow, getFollowers, getFollowing };
