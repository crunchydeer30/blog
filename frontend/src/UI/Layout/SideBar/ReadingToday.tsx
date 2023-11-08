import useReadingToday from "../../../features/posts/hooks/useReadingToday";
import PostItemSM from "../../../features/posts/components/PostItemSM";
import { BulletList } from "react-content-loader";

const ReadingToday = () => {
  const { posts, isLoading } = useReadingToday();

  if (isLoading) return <BulletList />

  return (
    <section className="flex flex-col gap-6">
      <p className="flex items-center font-semibold gap-2 text-lg">
        <span className="bg-green-600 rounded-full w-2 h-2" />
        What We're Reading Today
      </p>
      <section className="flex flex-col gap-6">
        {posts?.data.map((post) => (
          <PostItemSM key={post.id} post={post} />
        ))}
      </section>
    </section>
  );
};

export default ReadingToday;
