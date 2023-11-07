import { NavLink } from 'react-router-dom';
import SideNavLink from './SideNavLink';
import { Link } from 'react-router-dom';
import useUser from '../../../features/authentication/hooks/useUser';
import { useContext } from 'react';
import { viewportContext } from '../../../context/viewportContext';

const classNames: string[] = [
  'h-screen',
  'flex',
  'flex-col',
  'flex-[0_0_100px]',
  'gap-12',
  'p-6',
  'border-r-[1px]',
  'border-r-gray-200',
  'justify-between',
  'items-center',
  'sticky',
  'top-0',
  'left-0',
];

const SideNav = () => {
  const { user } = useUser();
  const { isMobile } = useContext(viewportContext);

  if (isMobile) return null;

  return (
    <nav className={classNames?.join(' ')}>
      <NavLink to="/">
        <img src="/icons/logo.png" alt="logo" />
      </NavLink>
      <nav className="flex flex-col gap-9 items-center sm:-mt-8">
        <SideNavLink to="/feed" icon="home" />
        <SideNavLink to="/notifications" icon="notification" />
        <SideNavLink to="/bookmarks" icon="bookmark" />
        <SideNavLink to="/search" icon="search" />
        <div className="border-b-[2px] border-b-gray-300 w-full" />
        <SideNavLink to="/create" icon="write" />
      </nav>
      {user ? (
        <Link
          to={`/users/${user?.id}`}
          className="w-12 h-12 rounded-full   overflow-hidden"
        >
          <img
            src={user?.profileImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </Link>
      ) : (
        <SideNavLink to="/signin" icon="login1" />
      )}
    </nav>
  );
};

export default SideNav;
