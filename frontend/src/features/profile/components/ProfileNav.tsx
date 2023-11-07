import FeedNav from "../../../UI/FeedNav"
import FeedNavLink from "../../../UI/FeedNavLink"

interface ProfileNavProps {
  profileId: string
}

const ProfileNav = ({profileId}: ProfileNavProps) => {
  return (
    <FeedNav>
      <FeedNavLink to={`/users/${profileId}`}>Posts</FeedNavLink>
      <FeedNavLink to={`/users/${profileId}/about`}>About</FeedNavLink>
      <FeedNavLink to={`/users/${profileId}/followers`}>Followers</FeedNavLink>
      <FeedNavLink to={`/users/${profileId}/following`}>Following</FeedNavLink>
    </FeedNav>
  )
}

export default ProfileNav