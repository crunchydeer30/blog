import { useMutation } from '@tanstack/react-query';
import apiSubscriptions from '../api/apiSubscriptions';
import toast from 'react-hot-toast';
import { generateError } from '../../../utils';
import { useQueryClient } from '@tanstack/react-query';

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow, isPending: isLoading } = useMutation({
    mutationFn: async (userId: string) =>
      toast.promise(apiSubscriptions.follow(userId), {
        loading: 'Subscrbing...',
        success: 'Subscribed!',
        error: (error) => generateError(error),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['followingPosts'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  return { follow, isLoading };
};

export default useFollow;
