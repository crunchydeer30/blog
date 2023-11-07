import { useInfiniteQuery } from '@tanstack/react-query';
import apiPosts from '../../posts/api/apiPosts';
import { PostQueryParams } from '../../posts/types';
import { useParams } from 'react-router-dom';

const useUserPosts = (userId: string, query: PostQueryParams = {}) => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['userPosts', id || userId],
    queryFn: async ({ pageParam = 1 }) =>
      await apiPosts.getAll({ ...query, page: pageParam, author: id || userId }),
    getNextPageParam: (lastPage) => lastPage.meta.next || undefined,
    initialPageParam: 1,
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

export default useUserPosts;
