import { useQuery } from '@tanstack/react-query';
import storageService from '../../../services/storageService';

const useSearchHistory = () => {
  const { data: searchHistory } = useQuery({
    queryKey: ['searchHistory'],
    queryFn: async () => await storageService.getSearchHistory(),
  });

  return { searchHistory };
};

export default useSearchHistory;
