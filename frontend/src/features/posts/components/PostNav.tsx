import FeedNav from '../../../UI/FeedNav';
import FeedNavLink from '../../../UI/FeedNavLink';

const PostNav = () => {
  return (
    <FeedNav>
      <FeedNavLink to="/feed/latest">Latest</FeedNavLink>
      <FeedNavLink to="/feed/following">Following</FeedNavLink>
    </FeedNav>
  );
};

export default PostNav;
