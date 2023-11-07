export interface TopicPostsQueryParams {
  q?: string;
  page?: number;
  author?: string;
  pageSize?: number;
  topic: string;
}

export interface TopicQueryParams {
  q?: string;
}