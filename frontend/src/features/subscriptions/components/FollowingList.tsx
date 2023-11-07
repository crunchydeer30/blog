import useFollowing from "../hooks/useFollowing";
import UserItem from "../../users/components/UserItem";
import Spinner from "../../../UI/Elements/Spinner/Spinner";
import NotFoundText from "../../../UI/NotFoundText";

const FollowingList = () => {
  const { following, isLoading } = useFollowing();

  if (isLoading) return <Spinner />
  if (!following?.length) return <NotFoundText>User hasn't followed anyone yet</NotFoundText>;


  return (
    <section className="flex flex-col gap-4">
      {following?.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </section>
  )
}

export default FollowingList