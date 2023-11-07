import { useInfiniteQuery } from '@tanstack/react-query';
import apiPosts from '../api/apiPosts';
import { PostQueryParams } from '../types';

const useFollowingPosts = (query: PostQueryParams = {}) => {
  const {
    isLoading,
    isError,
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['followingPosts'],
    queryFn: async ({ pageParam = 1 }) =>
      await apiPosts.getFollowing({ ...query, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage?.meta.next || undefined,
    initialPageParam: 1,
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

export default useFollowingPosts;