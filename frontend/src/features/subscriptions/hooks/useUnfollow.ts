import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import apiSubscriptions from '../api/apiSubscriptions';
import { generateError } from '../../../utils';

const useUnfollow = () => {
  const queryClient = useQueryClient();

  const { mutate: unfollow, isPending: isLoading } = useMutation({
    mutationFn: async (userId: string) =>
      toast.promise(apiSubscriptions.unfollow(userId), {
        loading: 'Unsubscribing...',
        success: 'Unsubscribed!',
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

  return { unfollow, isLoading };
};

export default useUnfollow;
