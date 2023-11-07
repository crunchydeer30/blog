import UserFeed from '../../users/components/UserFeed';
import useSearchAuthors from '../hooks/useSearchUsers';
import { useSearchParams } from 'react-router-dom';
import NotFoundText from '../../../UI/NotFoundText';
import { BulletList } from 'react-content-loader';

const SearchUsers = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  const {
    isLoading,
    isError,
    users,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchAuthors({q: q || '', pageSize: 10});

  if (isLoading) return <BulletList />
  if (!users?.length) return <NotFoundText>No users found</NotFoundText>;

  return (
    <UserFeed
      isLoading={isLoading}
      users={users}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
    />
  );
};

export default SearchUsers;