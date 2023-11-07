import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { SignedInUser } from '../types';
import apiAuth from '../api/apiAuth';
import storageService from '../../../services/storageService';

const useUser = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<SignedInUser | null>({
    queryKey: ['user'],
    queryFn: async (): Promise<SignedInUser | null> =>
      apiAuth.getSignedInUser(user),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialData: storageService.loadUser(),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    queryClient.invalidateQueries({ queryKey: ['bookmarksIDs'] });
    queryClient.invalidateQueries({ queryKey: ['subscriptions'] });

    if (!user) storageService.removeUser();
    else
      storageService.saveUser({
        token: user.token,
        id: user.id,
        profileImage: user.profileImage,
        displayName: user.displayName,
      });
  }, [user, queryClient]);

  return {
    user: user ?? null,
  };
};

export default useUser;
