import NotFoundText from '../../../UI/NotFoundText';
import useSearchTopics from '../hooks/useSearchTopics';
import TopicLink from '../../topics/components/TopicLink';
import Spinner from '../../../UI/Elements/Spinner/Spinner';
import { useSearchParams } from 'react-router-dom';

const SearchTopics = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  const { topics, isLoading } = useSearchTopics({q: q || ''});

  if (!topics?.length) return <NotFoundText>No Topics found</NotFoundText>;
  if (isLoading) return <Spinner />;

  return (
    <section className="flex gap-2 flex-wrap">
      {topics.map((topic) => (
        <TopicLink key={topic.id} topic={topic} />
      ))}
    </section>
  );
};

export default SearchTopics;
