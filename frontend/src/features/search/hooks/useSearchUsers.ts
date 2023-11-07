import { useInfiniteQuery } from "@tanstack/react-query"
import { queryToQueryKey } from "../../../utils";
import { UserQueryParams } from "../../users/types";
import apiUsers from "../../users/api/apiUsers";
import { useEffect } from "react";
import { errorToats } from "../../../utils";

const useSearchUsers = (query: UserQueryParams = {}) => {
  const {
    isLoading,
    isError,
    data: users,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error
  } = useInfiniteQuery({
    queryKey: ['search', 'authors', ...queryToQueryKey(query)],
    queryFn: async ({ pageParam = 1 }) =>
      await apiUsers.getAll({ ...query, page: pageParam }),
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
    users: users?.pages.map((page) => page.data).flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}

export default useSearchUsers;