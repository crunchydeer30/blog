import NotFoundText from '../UI/NotFoundText';
import useTopic from '../features/topics/hooks/useTopic';
import Spinner from '../UI/Elements/Spinner/Spinner';
import PageHeading from '../UI/PageHeading';
import TopicPosts from '../features/topics/components/TopicPosts';

const TopicPage = () => {
  const { topic, isLoading } = useTopic();

  if (!topic) return <NotFoundText>Topic not found</NotFoundText>;
  if (isLoading) return <Spinner />;

  return (
    <section>
      <PageHeading>{topic.title}</PageHeading>
      <TopicPosts topic={topic} />
    </section>
  );
};

export default TopicPage;
