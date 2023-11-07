import useProfile from '../hooks/useProfile';
import NotFoundText from '../../../UI/NotFoundText';

const ProfileAbout = () => {
  const { profile } = useProfile();

  return (
    <section>
      {profile?.personalInfo ? (
        <p className='text-xl'>{profile.personalInfo}</p>
      ) : (
        <NotFoundText>User hasn't provided any personal info</NotFoundText>
      )}
    </section>
  );
};

export default ProfileAbout;
