import { Post, Topic, User } from '@prisma/client';

export interface UserToken {
  userId: string;
  username: string;
}

export interface PostItem extends Post {
  author: Pick<User, 'id' | 'displayName' | 'profileImage'>;
  topic: Pick<Topic, 'id'>;
}

export interface CommentItem extends Comment {
  user: Pick<User, 'id' | 'displayName' | 'profileImage'>;
}

export type UserInfo = Omit<User, 'password'>;

export interface UserProifle extends UserInfo {
  followedBy: {
    followerId: string;
  }[];
  following: {
    followingId: string;
  }[];
}

export type UserItem = Pick<User, 'id' | 'displayName' | 'profileImage' | 'personalInfo'>; 