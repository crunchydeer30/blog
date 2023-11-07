import useLatestPosts from '../hooks/useLatestPosts';
import Feed from './PostFeed';

const LatestPosts = () => {
  const {
    isLoading,
    posts: latestPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useLatestPosts({ pageSize: 5 });

  return (
    <Feed isLoading={isLoading} posts={latestPosts} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} isError={isError} />
  )
};

export default LatestPosts;
