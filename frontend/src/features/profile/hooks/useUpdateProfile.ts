import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useUser from '../../authentication/hooks/useUser';
import apiProfile from '../api/apiProfile';
import { generateError } from '../../../utils';
import { UpdateProfileInfo } from '../types';
import { useQueryClient } from '@tanstack/react-query';

const useUpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: async (data: UpdateProfileInfo) =>
      toast.promise(apiProfile.updateProfile(user?.id as string, data), {
        loading: 'Updating profile...',
        success: 'Profile updated',
        error: (error) => generateError(error),
      }),
    onSuccess: () => {
      navigate('/');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['users', user?.id] });
    },
  });

  return {
    updateProfile,
    isLoading,
    error,
  };
};

export default useUpdateProfile;
