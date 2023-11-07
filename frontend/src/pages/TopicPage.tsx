import NotFoundText from '../UI/NotFoundText';
import useTopic from '../features/topics/hooks/useTopic';
import Spinner from '../UI/Elements/Spinner/Spinner';

const TopicPage = () => {
  const { topic, isLoading } = useTopic();

  if (!topic) return <NotFoundText>Topic not found</NotFoundText>;
  if (isLoading) return <Spinner />;

  return <div>TopicPage</div>;
};

export default TopicPage;
