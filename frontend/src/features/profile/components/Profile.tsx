import { UserProfile } from '../types';
import ProfileHeader from './ProfileHeader';
// import ProfilePosts from './ProfilePosts';
import ProfileNav from './ProfileNav';
import { Outlet } from 'react-router-dom';

interface ProfileProps {
  profile: UserProfile;
}

const Profile = ({ profile }: ProfileProps) => {
  return (
    <section className="flex flex-col gap-10 sm:gap-24">
      <ProfileHeader profile={profile} />
      <section className='flex flex-col gap-10'>
        <ProfileNav profileId={profile.id} />
        <Outlet />
      </section>
    </section>
  );
};

export default Profile;
