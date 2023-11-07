import PostItem from './PostItem';
import Spinner from '../../../UI/Elements/Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroller';
import Button from '../../../UI/Elements/Button/Button';
import { PostItem as IPostItem } from '../types';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { InfiniteData } from '@tanstack/react-query';
import { PaginatedPostItems } from '../types';
import PostFeedLoader from '../../../UI/Elements/Loaders/PostFeedLoader';
import NotFoundText from '../../../UI/NotFoundText';

interface FeedProps {
  posts: IPostItem[] | undefined;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<PaginatedPostItems, unknown>,
      Error
    >
  >;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
}

const PostFeed = (props: FeedProps) => {
  if (props.isLoading) return <PostFeedLoader />;
  if(props.isError) return <NotFoundText>Something went wrong!</NotFoundText>;
  if (!props.posts?.length) return <NotFoundText>No posts yet</NotFoundText>;

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => props.fetchNextPage()}
        hasMore={props.hasNextPage}
      >
        {props.posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      {!props.isFetchingNextPage && props.hasNextPage && (
        <Button onClick={() => props.fetchNextPage()}>Load More</Button>
      )}
      {props.isFetchingNextPage && <Spinner />}
    </>
  );
};

export default PostFeed;
