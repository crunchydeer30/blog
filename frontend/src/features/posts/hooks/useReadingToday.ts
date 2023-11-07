import { useQuery } from '@tanstack/react-query';
import apiPosts from '../api/apiPosts';

const useReadingToday = () => {
  const { data: posts } = useQuery({
    queryKey: ['readingToday'],
    queryFn: async () => await apiPosts.getAll({ pageSize: 3 }),
  });

  return {
    posts,
  };
};

export default useReadingToday;
