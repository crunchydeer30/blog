import PageHeading from '../UI/PageHeading';
import useUser from '../features/authentication/hooks/useUser';
import useProfile from '../features/profile/hooks/useProfile';
import ProfileEditForm from '../features/profile/components/ProfileEditForm';
import Spinner from '../UI/Elements/Spinner/Spinner';
import NotFoundText from '../UI/NotFoundText';

const ProfileEditPage = () => {
  const { user } = useUser();
  const { profile, isLoading } = useProfile(user?.id);

  if (isLoading) return <Spinner />;
  if (!user) return <NotFoundText>Please Sign In</NotFoundText>;

  return (
    <section>
      <PageHeading>Edit Profile</PageHeading>
      {profile && <ProfileEditForm />}
    </section>
  );
};

export default ProfileEditPage;
