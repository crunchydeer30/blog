import useUser from '../../authentication/hooks/useUser';
import useFollowingPosts from '../hooks/useFollowingPosts';
import Feed from './PostFeed';
import NotFoundText from '../../../UI/NotFoundText';
import PostFeedLoader from '../../../UI/Elements/Loaders/PostFeedLoader';
import AuthPrompt from '../../authentication/components/AuthPrompt';

const FollowingPosts = () => {
  const { user } = useUser();

  const {
    isLoading,
    posts: followingPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError
  } = useFollowingPosts({ pageSize: 5 });

  if (!user) return <AuthPrompt>
    <p className='text-xl'>Sign In to follow authors</p>
  </AuthPrompt>;
  if (isLoading) return <PostFeedLoader />
  if (!followingPosts?.length) return <NotFoundText>Follow authors to get the latest stories</NotFoundText>;

  return (
    <Feed
      isLoading={isLoading}
      posts={followingPosts}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
    />
  );
};

export default FollowingPosts;
