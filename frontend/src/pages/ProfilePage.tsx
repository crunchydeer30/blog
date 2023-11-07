import Spinner from "../UI/Elements/Spinner/Spinner";
import useProfile from "../features/profile/hooks/useProfile";
import Profile from "../features/profile/components/Profile";
import { useEffect } from "react";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { profile, isLoading } = useProfile();

  if (isLoading) return <Spinner />;
  if (!profile) return <p>User not found</p>;

  return (
    <Profile profile={profile} />
  );
};

export default ProfilePage;
