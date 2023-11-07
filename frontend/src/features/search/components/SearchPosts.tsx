import Feed from '../../posts/components/PostFeed';
import useSearchPosts from '../hooks/useSearchPosts';
import { useSearchParams } from 'react-router-dom';
import NotFoundText from '../../../UI/NotFoundText';
import PostFeedLoader from '../../../UI/Elements/Loaders/PostFeedLoader';

const SearchPosts = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  const {
    isLoading,
    isError,
    posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchPosts({q: q || '', pageSize: 5});

  if (isLoading) return <PostFeedLoader />
  if (!posts?.length) return <NotFoundText>No posts found</NotFoundText>;

  return (
    <Feed
      isLoading={isLoading}
      posts={posts}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
    />
  );
};

export default SearchPosts;
