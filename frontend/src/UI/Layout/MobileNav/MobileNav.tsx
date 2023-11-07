import MobileNavLink from "./MobileNavLink"
import useUser from "../../../features/authentication/hooks/useUser"


const MobileNav = () => {
  const { user } = useUser();

  return (
    <nav className="flex flex-col w-full absolute left-0 top-[101%] bg-white shadow z-50">
      <MobileNavLink to="/" icon="home">Home</MobileNavLink>
      <MobileNavLink to="/bookmarks" icon="bookmark">Bookmarks</MobileNavLink>
      <MobileNavLink to="/search" icon="search">Search</MobileNavLink>
      <MobileNavLink to="/create" icon="write">Create</MobileNavLink>
      {user ? (<MobileNavLink to={`/users/${user.id}`} icon="person">Profile</MobileNavLink>) : (
        <MobileNavLink to="/signin" icon="login">Sign In</MobileNavLink>
      )}
    </nav>
  )
}

export default MobileNav