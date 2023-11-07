import PostNav from '../features/posts/components/PostNav';
import { Outlet } from 'react-router-dom';


const HomePage = () => {
  return (
    <section className='flex flex-col gap-12'>
      <PostNav />
      <Outlet />
    </section>
  );
};

export default HomePage;
