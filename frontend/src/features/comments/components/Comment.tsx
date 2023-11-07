import { Link } from 'react-router-dom';
import { Comment as IComment } from '../../../types';
import useUser from '../../authentication/hooks/useUser';
import useDeleteComment from '../hooks/useDeleteComment';

interface CommentProps {
  comment: IComment;
}

const Comment = ({ comment }: CommentProps) => {
  const { user } = useUser();
  const { deleteComment } = useDeleteComment();

  return (
    <article className="flex flex-col gap-4 p-4 border-[1px] border-gray-200 rounded-lg">
      <section className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link
            to={`/users/${comment.user.id}`}
            className="w-6 h-6 rounded-full overflow-hidden"
          >
            <img
              src={comment.user.profileImage}
              alt={comment.user.displayName}
            />
          </Link>
          <Link to={`/users/${comment.user.id}`}>
            {comment.user.displayName}
          </Link>
          <p className="text-secondary text-xs">
            {comment.createdAt.toString().substring(0, 10)}
          </p>
        </div>
        {user?.id === comment.user.id && (
          <button onClick={() => deleteComment(comment.id)}>
            <svg className='w-5 h-5 fill-secondary transition hover:fill-primary'>
              <use href="/icons/sprite.svg#icon-trash" />
            </svg>
          </button>
        )}
      </section>
      <section>
        <p className="text-lg">{comment.content}</p>
      </section>
    </article>
  );
};

export default Comment;
