import PostOverview from "./PostOverview";

const ReadingToday = () => {
  return (
    <section className="flex flex-col gap-6">
      <p className="flex items-center font-semibold gap-2 text-lg">
        <span className="bg-green-600 rounded-full w-2 h-2" />
        What We're Reading Today
      </p>
      <section className="flex flex-col gap-6">
        <PostOverview />
        <PostOverview />
        <PostOverview />
      </section>
    </section>
  );
};

export default ReadingToday;
