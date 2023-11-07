import { useInfiniteQuery } from '@tanstack/react-query';
import apiPosts from '../api/apiPosts';
import { PostQueryParams } from '../types';
import { queryToQueryKey } from '../../../utils';

const useLatestPosts = (query: PostQueryParams = {}) => {
  const {
    isLoading,
    isError,
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['latestPosts', ...queryToQueryKey(query)],
    queryFn: async ({ pageParam = 1 }) =>
      await apiPosts.getAll({ ...query, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.next || undefined,
    initialPageParam: 1,
    retry: false
  });


  return {
    isLoading,
    isError,
    posts: posts?.pages.map((page) => page.data).flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useLatestPosts;
