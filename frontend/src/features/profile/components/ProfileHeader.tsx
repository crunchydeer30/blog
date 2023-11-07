import useSignOut from '../../authentication/hooks/useSignOut';
import useUser from '../../authentication/hooks/useUser';
import Button from '../../../UI/Elements/Button/Button';
import { ButtonStyle } from '../../../UI/Elements/Button/types';
import LinkButton from '../../../UI/Elements/Button/LinkButton';
import { UserProfile } from '../types';
import useFollow from '../../subscriptions/hooks/useFollow';
import useUnfollow from '../../subscriptions/hooks/useUnfollow';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const { user } = useUser();
  const signOut = useSignOut();

  const { follow } = useFollow();
  const { unfollow } = useUnfollow();

  return (
    <section className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
      <section className="flex gap-8 items-center">
        <div className="h-24 w-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow">
          <img
            src={profile.profileImage}
            alt="profile image"
            className="w-full h-full object-cover"
          />
        </div>
        <section className="flex flex-col gap-2 sm:gap-4 py-4">
          <div>
            <h1 className="font-semibold  text-xl sm:text-3xl">{profile.displayName}</h1>
            <p className="text-secondary text-sm sm:text-md">@{profile.username}</p>
          </div>
          <p className="text-secondary text-sm sm:text-md">
            {profile.followedBy.length} Followers
          </p>
        </section>
      </section>
      <section className="flex sm:flex-col gap-2 self-stretch sm:self-center">
        {user?.id === profile.id ? (
          <>
            <Button onClick={signOut} classes={['w-full']}>Sign Out</Button>
            <LinkButton link="/profile/edit" style={ButtonStyle.SECONDARY} classes={['w-full']}>
              Edit
            </LinkButton>
          </>
        ) : (
          <>
            {profile.followedBy.find(
              (subsctiption) => subsctiption.followerId === user?.id
            ) ? (
              <Button
                style={ButtonStyle.GREEN_OUTLINE}
                onClick={() => unfollow(profile.id)}
                classes={['w-full']}
              >
                Following
              </Button>
            ) : (
              <Button
                style={ButtonStyle.GREEN}
                onClick={() => follow(profile.id)}
                classes={['w-full']}
              >
                Follow
              </Button>
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default ProfileHeader;
