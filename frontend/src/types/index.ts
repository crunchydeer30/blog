export interface PaginationInfo {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  thumbnail: string;
  header: string;
  description: string;
  topicId: string;
  authorId: string;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  username: string;
  personalInfo: string;
  displayName: string;
  profileImage: string;
  role: Role;
}

export interface Topic {
  id: string;
  title: string;
}

export interface Bookmark {
  userId: string;
  postId: string;
}

export interface Subscription {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string,
    displayName: string,
    profileImage: string
  }
}

export interface UserInfo {
  id: string
  username: string;
  displayName: string;
  profileImage: string;
  email: string;
  role: string;
  followedBy: {
    followerId: string[];
  }
  following: {
    followingId: string[]
  }
}
