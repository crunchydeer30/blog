import useTopicPosts from '../hooks/useTopicPosts';
import PostFeed from '../../posts/components/PostFeed';
import { Topic } from '../../../types';

interface TopicPostsProps {
  topic: Topic;
}

const TopicPosts = ({ topic }: TopicPostsProps) => {
  const {
    isLoading,
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useTopicPosts({ topic: topic.id, pageSize: 5 });

  return (
    <PostFeed
      isLoading={isLoading}
      posts={posts}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
    />
  );
};

export default TopicPosts;
