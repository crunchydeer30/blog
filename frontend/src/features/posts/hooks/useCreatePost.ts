import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { generateError } from '../../../utils';
import { CreatePostInfo } from '../types';
import apiPosts from '../api/apiPosts';

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: createPost,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: async (postInfo: CreatePostInfo) => toast.promise(apiPosts.create(postInfo), {
      loading: 'Creating post...',
      success: 'Post created',
      error: (error) => generateError(error),
    }),
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate(`/posts/${post.id}`);
    }
  });

  return {
    createPost,
    isLoading,
    error,
  };
};


export default useCreatePost;