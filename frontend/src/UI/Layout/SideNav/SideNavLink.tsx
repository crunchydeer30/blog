import { NavLink, NavLinkProps } from 'react-router-dom';

interface SideNavLinkProps extends NavLinkProps {
  to: string;
  icon: string;
  end?: boolean;
}

const SideNavLink = (props: SideNavLinkProps) => {
  return (
    <NavLink
      end={props.end}
      to={props.to}
      className={({ isActive }) =>
        ['w-7 h-7 hover:fill-black transition', isActive ? 'fill-primary scale-[1.3]' : 'fill-secondary'].join(' ')
      }
    >
      <svg className="w-full h-full">
        <use href={`/icons/sprite.svg#icon-${props.icon}`} />
      </svg>
    </NavLink>
  );
};

export default SideNavLink;
