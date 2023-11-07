import Spinner from '../../../UI/Elements/Spinner/Spinner';
import useComments from '../hooks/useComments';
import Comment from './Comment';
import NotFoundText from '../../../UI/NotFoundText';

const CommentsList = () => {
  const { comments, isLoading } = useComments();

  if (isLoading) return <Spinner />;
  if (!comments?.length) return <NotFoundText>No comments yet</NotFoundText>;

  return (
    <section className='flex flex-col gap-6'>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default CommentsList;
