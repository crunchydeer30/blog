import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import toast from 'react-hot-toast';
import apiComments from '../api/apiComments';
import { generateError } from '../../../utils';
import { CreateCommentInfo } from '../../posts/types';
import { useQueryClient } from '@tanstack/react-query';

const useCreateComment = () => {
  const { id: postId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: createComment,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: async (comment: CreateCommentInfo) =>
      await toast.promise(apiComments.create(postId as string, comment), {
        loading: 'Adding comment...',
        success: 'Comment added',
        error: (error) => generateError(error),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  return {
    createComment,
    isLoading,
    error,
  };
};

export default useCreateComment;
