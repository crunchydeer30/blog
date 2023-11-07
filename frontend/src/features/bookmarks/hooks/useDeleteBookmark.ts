import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import apiBookmarks from '../api/apiBookmarks';
import { generateError } from '../../../utils';

const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBookmark,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: async (id: string) => await toast.promise(apiBookmarks.deleteById(id), {
      loading: 'Removing bookmark...',
      success: 'Bookmark removed',
      error: (error) => generateError(error),
    }),
    // mutationFn: apiBookmarks.deleteById,
    onSuccess: () => {
      // toast.success('Bookmark removed');
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['bookmarksIDs'] });
    }
  });

  return { deleteBookmark, isLoading, error };
};

export default useDeleteBookmark;
