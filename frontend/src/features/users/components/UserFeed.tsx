import UserItem from './UserItem';
import { UserItem as IUserItem } from '../types';
import Spinner from '../../../UI/Elements/Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroller';
import Button from '../../../UI/Elements/Button/Button';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { InfiniteData } from '@tanstack/react-query';
import { PaginatedUserItems } from '../types';
import NotFoundText from '../../../UI/NotFoundText';
import { BulletList } from 'react-content-loader';

interface FeedProps {
  users: IUserItem[] | undefined;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<PaginatedUserItems, unknown>,
      Error
    >
  >;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
}

const UserFeed = (props: FeedProps) => {
  if (props.isLoading) return <BulletList />;
  if (props.isError) return <NotFoundText>Something went wrong!</NotFoundText>;
  if (!props.users?.length) return <NotFoundText>No posts yet</NotFoundText>;

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => props.fetchNextPage()}
        hasMore={props.hasNextPage}
      >
        <section className='flex flex-col gap-4'>
          {props.users?.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </section>
      </InfiniteScroll>
      {!props.isFetchingNextPage && props.hasNextPage && (
        <Button onClick={() => props.fetchNextPage()}>Load More</Button>
      )}
      {props.isFetchingNextPage && <Spinner />}
    </>
  );
};

export default UserFeed;
