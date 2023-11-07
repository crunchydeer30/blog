import useFollowers from "../hooks/useFollowers"
import UserItem from "../../users/components/UserItem"
import Spinner from "../../../UI/Elements/Spinner/Spinner";
import NotFoundText from "../../../UI/NotFoundText";

const FollowersList = () => {
  const { followers, isLoading } = useFollowers();

  if (isLoading) return <Spinner />
  if (!followers?.length) return <NotFoundText>Be the first to follow the user</NotFoundText>;

  return (
    <section className="flex flex-col gap-4">
      {followers?.map((follower) => (
        <UserItem key={follower.id} user={follower} />
      ))}
    </section>
  )
}

export default FollowersList