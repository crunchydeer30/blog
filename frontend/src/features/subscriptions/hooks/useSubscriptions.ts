import { useQuery } from '@tanstack/react-query';
import apiSubscriptions from '../api/apiSubscriptions';

const useSubscriptions = () => {
  const {
    data: subscriptions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      try {
        const response = await apiSubscriptions.getSubscriptions();
        return response;
      } catch (error) {
        return null;
      }
    },
  });

  return { subscriptions, isLoading, error };
};

export default useSubscriptions;
