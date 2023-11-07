import SideNav from './SideNav/SideNav';
import SideBar from './SideBar/SideBar';
import Main from './Main';
import PageWrapper from './PageWrapper';
import { Outlet } from 'react-router-dom';
import MobileHeader from './MobileNav/MobileHeader';

const AppLayout = () => {  
  return (
    <PageWrapper>
      <MobileHeader />
      <SideNav />
      <Main>
        <Outlet />
      </Main>
      <SideBar />
    </PageWrapper>
  );
};

export default AppLayout;
