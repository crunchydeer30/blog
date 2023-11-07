import { Link } from 'react-router-dom';

import { PostItem as IPostItem } from '../types';
import TopicLink from '../../../UI/TopicLink';
import useBookmarksIDs from '../../bookmarks/hooks/useBookmarsksIDs';
import useCreateBookmark from '../../bookmarks/hooks/useCreateBookmark';
import useDeleteBookmark from '../../bookmarks/hooks/useDeleteBookmark';
import { useContext } from 'react';
import { viewportContext } from '../../../context/viewportContext';

interface PostItemProps {
  post: IPostItem;
}

const PostItem = ({ post }: PostItemProps) => {
  const { isMobile } = useContext(viewportContext);
  const { bookmarksIDs } = useBookmarksIDs();

  const isBookmarked = bookmarksIDs?.find(
    (bookmark) => bookmark.postId === post.id
  );

  const { createBookmark } = useCreateBookmark();
  const { deleteBookmark } = useDeleteBookmark();

  if (isMobile)
    return (
      <article className="flex flex-col gap-4 border-b-[1px] border-b-gray-200 py-5">
        <section className="flex gap-2 items-center">
          <Link
            to={`/users/${post.author.id}`}
            className="w-6 h-6 rounded-[100%] overflow-hidden"
          >
            <img
              src={post.author.profileImage}
              alt="author"
              className="w-full h-full object-cover"
            />
          </Link>
          <Link to={`/users/${post.author.id}`} className="text-sm">
            {post.author.displayName}
          </Link>
          <p className="text-secondary text-xs">
            {post.createdAt.toString().substring(0, 10)}
          </p>
        </section>
        <section className="flex justify-between gap-8">
          <section className="flex flex-col gap-4">
            <Link to={`/posts/${post.id}`}>
              <h2 className="font-medium leading-[1.2]">{post.title}</h2>
            </Link>
            <p className="font-light text-sm line-clamp-2">
              {post.description}
            </p>
          </section>
          <Link
            to={`/posts/${post.id}`}
            className="flex h-[95px] shrink-0 rounded-xl overflow-hidden shadow-xl"
            preventScrollReset={false}
          >
            <img
              src={post.thumbnail}
              alt="post"
              className="w-full h-full object-cover"
            />
          </Link>
        </section>
        <section className="flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <TopicLink
              to={`/topics/${post.topic.id}`}
              classes={['text-xs font-light']}
            >
              {post.topic.title}
            </TopicLink>
            <p className="text-secondary font-light text-sm">3 min read</p>
          </div>
          <div>
            {isBookmarked ? (
              <button onClick={() => deleteBookmark(post.id)}>
                <svg className="w-6 h-6 fill-secondary hover:fill-primary transition">
                  <use href="/icons/sprite.svg#icon-bookmark-add" />
                </svg>
              </button>
            ) : (
              <button onClick={() => createBookmark(post.id)}>
                <svg className="w-6 h-6 fill-secondary hover:fill-primary transition">
                  <use href="/icons/sprite.svg#icon-bookmark-add-o" />
                </svg>
              </button>
            )}
          </div>
        </section>
      </article>
    );

  return (
    <article className="flex gap-16 border-b-[1px] border-b-gray-200 py-5 justify-between">
      <section className="flex flex-col gap-4">
        <section className="flex gap-2 items-center">
          <Link
            to={`/users/${post.author.id}`}
            className="w-5 h-5 rounded-[100%] overflow-hidden"
          >
            <img
              src={post.author.profileImage}
              alt="author"
              className="w-full h-full object-cover"
            />
          </Link>
          <Link to={`/users/${post.author.id}`}>{post.author.displayName}</Link>
          <p className="text-secondary text-xs">
            {post.createdAt.toString().substring(0, 10)}
          </p>
        </section>
        <Link to={`/posts/${post.id}`}>
          <h2 className="text-xl font-medium">{post.title}</h2>
        </Link>
        <p className="font-light line-clamp-2">{post.description}</p>
        <section className="flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <TopicLink
              to={`/topics/${post.topic.id}`}
              classes={['text-sm, font-light']}
            >
              {post.topic.title}
            </TopicLink>
            <p className="text-secondary font-light text-sm">3 min read</p>
            <p className="text-secondary font-light text-sm">
              Selected for you
            </p>
          </div>
          <div>
            {isBookmarked ? (
              <button onClick={() => deleteBookmark(post.id)}>
                <svg className="w-6 h-6 fill-secondary hover:fill-primary transition">
                  <use href="/icons/sprite.svg#icon-bookmark-add" />
                </svg>
              </button>
            ) : (
              <button onClick={() => createBookmark(post.id)}>
                <svg className="w-6 h-6 fill-secondary hover:fill-primary transition">
                  <use href="/icons/sprite.svg#icon-bookmark-add-o" />
                </svg>
              </button>
            )}
          </div>
        </section>
      </section>
      <Link
        to={`/posts/${post.id}`}
        className="flex w-36 h-36 shrink-0 rounded-xl overflow-hidden shadow-xl"
        preventScrollReset={false}
      >
        <img
          src={post.thumbnail}
          alt="post"
          className="w-full h-full object-cover"
        />
      </Link>
    </article>
  );
};

export default PostItem;
