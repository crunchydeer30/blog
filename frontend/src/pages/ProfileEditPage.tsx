import PageHeading from '../UI/PageHeading';
import useUser from '../features/authentication/hooks/useUser';
import useProfile from '../features/profile/hooks/useProfile';
import ProfileEditForm from '../features/profile/components/ProfileEditForm';
import Spinner from '../UI/Elements/Spinner/Spinner';

const ProfileEditPage = () => {
  const { user } = useUser();
  const { profile, isLoading } = useProfile(user?.id);

  return (
    <section>
      <PageHeading>Edit Profile</PageHeading>
      {isLoading && <Spinner />}
      {profile && <ProfileEditForm profile={profile} />}
    </section>
  );
};

export default ProfileEditPage;
