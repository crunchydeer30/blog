import apiBookmarks from '../api/apiBookmarks';
import { useQuery } from '@tanstack/react-query';

const useBookmarksIDs = () => {
  const {
    isLoading,
    error,
    data: bookmarksIDs,
  } = useQuery({
    queryKey: ['bookmarksIDs'],
    queryFn: async () => {
      try {
        const response = await apiBookmarks.getIDs();
        return response;
      } catch (error) {
        return [];
      }
    },
  });

  return { isLoading, error, bookmarksIDs };
};

export default useBookmarksIDs;
