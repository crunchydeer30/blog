import SearchBar from '../features/search/components/SearchBar';
import SearchHistory from '../features/search/components/SearchHistory';
import SearchResults from '../features/search/components/SearchResults';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <section className="flex flex-col gap-12">
      <SearchBar />
      {query ? <SearchResults /> : <SearchHistory />}
    </section>
  );
};

export default SearchPage;
