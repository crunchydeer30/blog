import PostContent from './PostContent';
import { PostItem } from '../types';
import CreateCommentForm from '../../comments/components/CreateCommentForm';
import CommentsList from '../../comments/components/CommentsList';

interface PostProps {
  post: PostItem;
}

const Post = ({ post }: PostProps) => {
  return (
    <section className="flex flex-col gap-12">
      <PostContent post={post} />
      <section className="flex flex-col gap-6">
        <h2 className='font-semibold text-2xl'>Comments</h2>
        <CreateCommentForm />
        <CommentsList />
      </section>
    </section>
  );
};

export default Post;
