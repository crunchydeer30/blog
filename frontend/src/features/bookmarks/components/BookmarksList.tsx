import PostItem from '../../posts/components/PostItem';
import useBookmarks from '../hooks/useBookmarks';
import Spinner from '../../../UI/Elements/Spinner/Spinner';
import NotFoundText from '../../../UI/NotFoundText';

const BookmarksList = () => {
  const { bookmarks, isFetching } = useBookmarks();

  if (isFetching && !bookmarks?.length) return <Spinner />;
  if (!bookmarks?.length) return <NotFoundText>Bookmark your favorite stories</NotFoundText>;

  return (
    <>
      <section>
        {bookmarks.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </section>
      {isFetching && <Spinner />}
    </>
  );
};

export default BookmarksList;
