import { PostItem } from "../types"
import { Link } from "react-router-dom"

interface MiniPostItemProps {
  post: PostItem
}

const PostItemSM = ({post}: MiniPostItemProps) => {
  return (
    <article className="flex flex-col gap-2">
      <section className="flex gap-2 items-center">
        <Link to={`/users/${post.author.id}`} className="w-5 h-5 rounded-full overflow-hidden">
          <img src={post.author.profileImage} alt="profile image" className="h-full w-full object-cover"/>
        </Link>
        <Link to="/users/id" className="text-secondary text-sm">
          {post.author.displayName}
        </Link>
      </section>
      <Link to={`/posts/${post.id}`} className="font-medium">
        <h3>{post.title}</h3>
      </Link>
    </article>
  )
}

export default PostItemSM;