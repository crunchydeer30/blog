import { useState } from 'react';

import useUser from '../../authentication/hooks/useUser';
import TextArea from '../../../UI/Form/TextArea';
import useCreateComment from '../hooks/useCreateComment';
import Button from '../../../UI/Elements/Button/Button';

const CreateCommentForm = () => {
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const { createComment } = useCreateComment();

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createComment({
      content: comment,
    });
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-[1px] border-gray-200 rounded-lg p-4">
      <section className='flex gap-2 items-center'>
        <div className='w-8 h-8 rounded-full overflow-hidden'>
          <img src={user.profileImage} alt={user.displayName} />
        </div>
        <p>{user.displayName}</p>
      </section>
      <TextArea
        name="comment"
        placeholder="Add to the discussion..."
        value={comment}
        onChange={setComment}
        rows={2}
        classes={['border-none !px-0 !py-0 focus:outline-none']}
      />
      <Button type="submit" classes={['self-end text-sm']}>
        Submit
      </Button>
    </form>
  );
};

export default CreateCommentForm;
