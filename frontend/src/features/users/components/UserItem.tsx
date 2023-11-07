import useSubscriptions from '../../subscriptions/hooks/useSubscriptions';
import { Link } from 'react-router-dom';
import Button from '../../../UI/Elements/Button/Button';
import { ButtonStyle } from '../../../UI/Elements/Button/types';
import { UserItem as IUserItem } from '../../subscriptions/types';
import useUser from '../../authentication/hooks/useUser';
import useFollow from '../../subscriptions/hooks/useFollow';
import useUnfollow from '../../subscriptions/hooks/useUnfollow';

interface UserItemProps {
  user: IUserItem;
}

const UserItem = ({ user }: UserItemProps) => {
  const { subscriptions } = useSubscriptions();
  const { user: loggedUser } = useUser();

  const { follow } = useFollow();
  const { unfollow } = useUnfollow();

  const isSubscribed = subscriptions?.find(
    (subscription) => subscription.followingId === user.id
  );

  return (
    <article className="flex gap-4 items-center justify-between">
      <section className="flex gap-4 sm:gap-6 items-center">
        <Link
          to={`/users/${user.id}`}
          className="w-12 h-12 rounded-full overflow-hidden border-[1px] border-gray-200"
        >
          <img src={user.profileImage} alt="profile image" />
        </Link>
        <div>
          <Link to={`/users/${user.id}`} className='text-lg'>{user.displayName}</Link>
          {user.personalInfo && (
            <p className="text-secondary text-xs line-clamp-2 max-w-1/2">
              {user.personalInfo}
            </p>
          )}
        </div>
      </section>
      {user.id !== loggedUser?.id && (
        <>
          {isSubscribed ? (
            <Button
              style={ButtonStyle.GREEN_OUTLINE}
              onClick={() => unfollow(user.id)}
              classes={['text-sm']}
            >
              Following
            </Button>
          ) : (
            <Button style={ButtonStyle.GREEN} onClick={() => follow(user.id)} classes={['text-sm']}>
              Follow
            </Button>
          )}
        </>
      )}
    </article>
  );
};

export default UserItem;
