import PageHeading from '../UI/PageHeading';
import BookmarksList from '../features/bookmarks/components/BookmarksList';

const BookmarksPage = () => {

  return (
    <section>
      <PageHeading>Bookmarks</PageHeading>
      <BookmarksList />
    </section>
  );
};

export default BookmarksPage;
