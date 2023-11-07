import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import storageService from '../../../services/storageService';

const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    queryClient.setQueryData(['user'], null);
    storageService.removeUser();
    navigate('/');
  }, [navigate, queryClient]);

  return signOut;
};

export default useSignOut;
