import { useQuery } from '@tanstack/react-query';
import apiBookmarks from '../api/apiBookmarks';

const useBookmarks = () => {
  const {
    isLoading,
    error,
    isFetching,
    isFetchedAfterMount,
    data: bookmarks,
  } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: apiBookmarks.getAll,
    retry: false,
  });

  return { isLoading, error, bookmarks, isFetching, isFetchedAfterMount };
};

export default useBookmarks;
