import TopicLink from "../../../features/topics/components/TopicLink";
import useTopics from "../../../features/topics/hooks/useTopics";

const RecommendedTopics = () => {
  const { topics } = useTopics();
  
  return (
    <section className="flex flex-col gap-4">
      <p className="text-lg">Recommended Topics</p>
      <section className="flex gap-2 flex-wrap">
        {topics?.map((topic) => (
          <TopicLink key={topic.id} topic={topic} />
        ))}
      </section>
    </section>
  );
};

export default RecommendedTopics;
