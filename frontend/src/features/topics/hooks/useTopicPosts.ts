import apiPosts from "../../posts/api/apiPosts";
import { TopicPostsQueryParams } from "../types";
import { useEffect } from "react";
import { errorToats } from "../../../utils";
import { useInfiniteQuery } from "@tanstack/react-query";

const useTopicPosts = (query: TopicPostsQueryParams) => {
  const {
    isLoading,
    isError,
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error
  } = useInfiniteQuery({
    queryKey: ['topic', 'posts', query.topic],
    queryFn: async ({ pageParam = 1 }) =>
      await apiPosts.getAll({ ...query, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage?.meta.next || undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (error) errorToats(error);
  });

  return {
    isLoading,
    isError,
    posts: posts?.pages.map((page) => page?.data).flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useTopicPosts;
