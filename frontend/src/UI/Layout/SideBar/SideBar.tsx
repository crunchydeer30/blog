import LinkButton from '../../Elements/Button/LinkButton';
import SearchBar from '../../../features/search/components/SearchBar';
import RecommendedTopics from './RecommendedTopics';
import ReadingToday from './ReadingToday';
import useUser from '../../../features/authentication/hooks/useUser';
import { useContext } from 'react';
import { viewportContext } from '../../../context/viewportContext';

const SideBar = () => {
  const { user } = useUser();
  const { isTablet } = useContext(viewportContext);

  if (isTablet) return null;

  return (
    <aside className="sticky top-0 right-0 flex-[0_0_340px] scrollbar-hidden  h-screen bg-white border-l-[1px] border-gray-200 py-12 px-6">
      <div className='flex flex-col gap-12 scrollbar-hidden  overflow-y-scroll h-full'>
        {!user && (
          <LinkButton link="/login" classes={['!rounded-3xl']}>
            Get Unlimited Access
          </LinkButton>
        )}
        <SearchBar />
        <ReadingToday />
        <RecommendedTopics />
      </div>
    </aside>
  );
};

export default SideBar;
