import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import apiSubscriptions from '../api/apiSubscriptions';
import { useEffect } from 'react';
import { errorToats } from '../../../utils';

const useFollowing = () => {
  const { id } = useParams();

  const {
    data: following,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['following', id],
    queryFn: async () => await apiSubscriptions.getFollowing(id as string),
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return { following, isLoading, error };
};

export default useFollowing;
