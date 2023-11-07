import apiTopics from '../api/apiTopics';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { errorToats } from '../../../utils';
import { TopicQueryParams } from '../types';

const useTopics = (query: TopicQueryParams = {}) => {
  const {
    data: topics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => await apiTopics.getAll(query),
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return { topics, isLoading, error };
};

export default useTopics;
