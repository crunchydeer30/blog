import CreatePostForm from '../features/posts/components/CreatePostForm';
import { useEffect } from 'react';

const CreatePostPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <CreatePostForm />;
};

export default CreatePostPage;
