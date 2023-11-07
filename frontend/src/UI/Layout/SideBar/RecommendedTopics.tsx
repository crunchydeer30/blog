import TopicLink from "../../TopicLink";

const RecommendedTopics = () => {
  return (
    <section className="flex flex-col gap-4">
      <p className="text-lg">Recommended Topics</p>
      <section className="flex gap-2 flex-wrap">
        <TopicLink to="/">Technology</TopicLink>
        <TopicLink to="/">Money</TopicLink>
        <TopicLink to="/">Business</TopicLink>
        <TopicLink to="/">Productivity</TopicLink>
        <TopicLink to="/">Productivity</TopicLink>
      </section>
    </section>
  );
};

export default RecommendedTopics;
