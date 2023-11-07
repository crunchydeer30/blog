import { useInfiniteQuery } from "@tanstack/react-query"
import { queryToQueryKey } from "../../../utils";
import { PostQueryParams } from "../../posts/types";
import apiPosts from "../../posts/api/apiPosts";
import { useEffect } from "react";
import { errorToats } from "../../../utils";

const useSearchPosts = (query: PostQueryParams = {}) => {
  const {
    isLoading,
    isError,
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error
  } = useInfiniteQuery({
    queryKey: ['search', 'posts', ...queryToQueryKey(query)],
    queryFn: async ({ pageParam = 1 }) =>
      await apiPosts.getAll({ ...query, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.next || undefined,
    initialPageParam: 1,
    retry: false
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return {
    isLoading,
    isError,
    posts: posts?.pages.map((page) => page.data).flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useSearchPosts;