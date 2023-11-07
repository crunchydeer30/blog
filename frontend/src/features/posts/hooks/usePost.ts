import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { errorToats } from '../../../utils';
import { useParams } from 'react-router-dom';

import apiPosts from '../api/apiPosts';

const usePost = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => apiPosts.getById(id as string),
    retry: false, 
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return { post, isLoading, error };
};

export default usePost;
