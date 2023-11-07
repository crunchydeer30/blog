import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { errorToats } from '../../../utils';
import apiTopics from '../api/apiTopics';

const useTopic = () => {
  const { id } = useParams();
  const {
    data: topic,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['topic', id],
    queryFn: () => apiTopics.getById(id as string),
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return { topic, isLoading, error };
};

export default useTopic;
