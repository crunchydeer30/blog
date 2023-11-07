import SearchNav from './SearchNav';
import { Outlet } from 'react-router-dom';

const SearchResults = () => {
  return <>
    <SearchNav />
    <Outlet />
  </>;
};

export default SearchResults;
