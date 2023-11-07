import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import apiComments from '../api/apiComments';

const useComments = () => {
  const {id: postId} = useParams();

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => apiComments.getAll(postId as string),
    retry: false,
  });

  return {comments, isLoading, error};
};

export default useComments;
