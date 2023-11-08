import { User } from '@prisma/client';
import prisma from '../db';
import CreateUserDto from '../dto/createUserDto';
import { hashPassword } from '../utils/auth';
import createHttpError from 'http-errors';
import { UserProifle } from '../types';
import UpdateUserProfileDto from '../dto/updateUserProfileDto';
import { uploadImage } from '../utils/cloudinary';
import { DEFAULT_PROFILE_IMAGE } from '../utils/misc';
import { createPaginator } from 'prisma-pagination';
import { parsePaginationQuery } from '../utils/parsers';

const buildUserQuery = (query: object) => {
  const params = [];

  if ('q' in query)
    params.push({
      displayName: { contains: query.q as string, mode: 'insensitive' as const },
    });

  return { params: { AND: params } };
};

const getAll = async (query: object) => {
  const { params } = buildUserQuery(query);
  const paginationOptions = parsePaginationQuery(query);
  const paginate = createPaginator({ perPage: paginationOptions.take });

  const users = await paginate(prisma.user, {
    where: {
      ...params,
    },
    select: {
      id: true,
      username: true,
      email: true,
      displayName: true,
      personalInfo: true,
      profileImage: true,
      role: true,
    },
  });

  return users;
};

const getById = async (id: string): Promise<UserProifle> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      email: true,
      profileImage: true,
      personalInfo: true,
      role: true,
      followedBy: {
        select: {
          followerId: true,
        },
      },
      following: {
        select: {
          followingId: true,
        },
      },
    },
  });

  if (!user) throw new createHttpError.NotFound('User not found');

  return user;
};

const getByUsername = async (username: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) throw new createHttpError.NotFound('User not found');

  return user;
};

const create = async (data: CreateUserDto) => {
  const { username, password, email } = data;
  const newUser = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password),
      email,
      displayName: username,
    },
  });
  return newUser;
};

const deleteById = async (id: string) => {
  const userToDelete = await getById(id);

  if (!userToDelete) throw new createHttpError.NotFound('User not found');

  await prisma.user.delete({
    where: {
      id,
    },
  });
};

const updateProfileInfo = async (
  userId: string,
  data: UpdateUserProfileDto
) => {
  const userToUpdate = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userToUpdate) throw new createHttpError.NotFound('User not found');

  console.log(data.profileImage);
  console.log(userToUpdate.profileImage);

  const imageToUpload = async () => {
    if (!data.profileImage) return DEFAULT_PROFILE_IMAGE;
    if (data.profileImage === userToUpdate.profileImage)
      return userToUpdate.profileImage;
    if (data.profileImage === userToUpdate.profileImage)
      return userToUpdate.profileImage;
    return (await uploadImage(data.profileImage)).secure_url;
  };

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profileImage: await imageToUpload(),
      displayName: data.displayName,
      personalInfo: data.personalInfo,
    },
  });

  return updatedUser;
};

export default {
  getAll,
  getById,
  getByUsername,
  create,
  deleteById,
  updateProfileInfo,
};
