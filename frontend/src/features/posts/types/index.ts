import { Post, Topic, User, PaginationInfo } from '../../../types';

export interface PostItem extends Post {
  author: Pick<User, 'id' | 'displayName' | 'profileImage'>;
  topic: Topic;
}

export interface PaginatedPostItems {
  data: PostItem[];
  meta: PaginationInfo;
}

export interface CreatePostInfo {
  title: string;
  description: string;
  content: string;
  topicId: string;
  thumbnail: string;
  header: string;
}

export interface PostQueryParams {
  topic?: string;
  author?: string;
  page?: number;
  pageSize?: number;
  q?: string;
}

export interface CreateCommentInfo {
  content: string;
}