import { Link } from "react-router-dom"

const PostOverview = () => {
  return (
    <article className="flex flex-col gap-2">
      <section className="flex gap-4 items-center">
        <Link to="/users/id" className="w-6 h-6 rounded-full overflow-hidden">
          <img src="/images/author.jpg" alt="as" className="h-full w-full object-cover"/>
        </Link>
        <Link to="/users/id" className="text-secondary">
          Amit Das
        </Link>
      </section>
      <Link to='/posts/id'>
        <h3 className="">Your portfolio is stopping you from geting that job</h3>
      </Link>
    </article>
  )
}

export default PostOverview