import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import apiComments from '../api/apiComments';
import { generateError } from '../../../utils';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { id: postId } = useParams();

  const {
    mutate: deleteComment,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: async (id: string) =>
      await toast.promise(apiComments.deleteById(id), {
        loading: 'Removing comment...',
        success: 'Comment removed',
        error: (error) => generateError(error),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return { deleteComment, isLoading, error };
};

export default useDeleteComment;
