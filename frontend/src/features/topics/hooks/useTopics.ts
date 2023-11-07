import apiTopics from '../api/apiTopics';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { errorToats } from '../../../utils';

const useTopics = () => {
  const {
    data: topics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['topics'],
    queryFn: apiTopics.getAll,
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return { topics, isLoading, error };
};

export default useTopics;
