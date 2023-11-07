import { Link } from 'react-router-dom';

import { PostItem } from '../types';
import TopicLink from '../../topics/components/TopicLink';
import Markdown from 'react-markdown';

interface PostContentProps {
  post: PostItem;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <section className="flex flex-col gap-8">
      <section className="w-full aspect-[21/9] rounded-lg overflow-hidden shadow-lg">
        <img
          src={post?.header}
          alt="post header"
          className="w-full h-full object-cover"
        />
      </section>
      <section className="flex gap-4 item-center justify-between">
        <section className="flex gap-4 items-center">
          <Link
            to={`/users/${post?.author.id}`}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden"
          >
            <img
              src={post?.author.profileImage}
              alt={post?.author.displayName}
            />
          </Link>
          <div>
            <Link
              to={`/users/${post?.author.id}`}
              className="font-semibold xs:text-xl"
            >
              {post?.author.displayName}
            </Link>
            <p className="text-secondary text-xs">
              Posted on {post?.createdAt.toString().substring(0, 10)}
            </p>
          </div>
        </section>
        <TopicLink topic={post?.topic} classes={['self-center']} />
      </section>
      <h1 className="font-semibold text-3xl lg:text-5xl leading-[1.3]">
        {post?.title}
      </h1>

      <section className="post text-lg md-edit">
        <Markdown>{post?.content}</Markdown>
      </section>
    </section>
  );
};

export default PostContent;
