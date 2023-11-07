import SearchHistoryItem from './SearchHistoryItem';
import useSearchHistory from '../hooks/useSearchHistory';

const SearchHistory = () => {
  const { searchHistory } = useSearchHistory();

  return (
    <section className="flex flex-col gap-8">
      <p className="text-3xl">Recent Searches</p>
      {searchHistory?.length ? (
        <section>
          {searchHistory.map((query) => (
            <SearchHistoryItem key={query} query={query} />
          ))}
        </section>
      ) : (
        <p>You have no recent searches</p>
      )}
    </section>
  );
};

export default SearchHistory;
