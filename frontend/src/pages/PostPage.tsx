import Post from '../features/posts/components/Post';
import usePost from '../features/posts/hooks/usePost';
import Spinner from '../UI/Elements/Spinner/Spinner';
import { useEffect } from 'react';

const PostPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { post, isLoading } = usePost();

  if (isLoading) return <Spinner />;
  if (!post) return <p>Post not found</p>;

  return <Post post={post} />;
};

export default PostPage;
