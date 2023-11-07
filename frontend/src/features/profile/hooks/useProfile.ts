import { useQuery } from '@tanstack/react-query';
import { errorToats } from '../../../utils';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import apiProfile from '../api/apiProfile';

const useProfile = (profileId: string = '') => {
  const { id } = useParams();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users', id],
    queryFn: async () => apiProfile.getById(profileId || id as string),
    retry: false,
  });

  useEffect(() => {
    if (error) errorToats(error);
  }, [error]);

  return { profile, isLoading, error };
};

export default useProfile;
