import PostItem from '../../posts/components/PostItem';
import InfiniteScroll from 'react-infinite-scroller';
import useUserPosts from '../hooks/useUserPosts';
import Spinner from '../../../UI/Elements/Spinner/Spinner';
import NotFoundText from '../../../UI/NotFoundText';


const ProfilePosts = () => {
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useUserPosts('', { pageSize: 5 });

  if (isLoading) return <Spinner />;
  if (!posts?.length) return <NotFoundText>User hasn't posted anything yet</NotFoundText>;

  return (
    <>
      <InfiniteScroll
        pageStart={1}
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
      >
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      {isFetchingNextPage && <Spinner />}
    </>
  );
};

export default ProfilePosts;
