import FeedNav from "../../../UI/FeedNav";
import FeedNavLink from "../../../UI/FeedNavLink";
import { useSearchParams } from "react-router-dom";

const SearchNav = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  return (
    <FeedNav>
      <FeedNavLink to={`/search/posts?q=${q}`}>Posts</FeedNavLink>
      <FeedNavLink to={`/search/authors?q=${q}`}>Authors</FeedNavLink>
      <FeedNavLink to={`/search/topics?q=${q}`}>Topics</FeedNavLink>
    </FeedNav>
  )
}

export default SearchNav