import { useQuery } from '@tanstack/react-query';
import apiSubscriptions from '../api/apiSubscriptions';
import { errorToats } from '../../../utils';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useFollowers = () => {
  const { id } = useParams();

  console.log();
  
  const {
    data: followers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['followers', id],
    queryFn: async () => await apiSubscriptions.getFollowers(id as string),
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return {followers, isLoading, error};
};

export default useFollowers;
