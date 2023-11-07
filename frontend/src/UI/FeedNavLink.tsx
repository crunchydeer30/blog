import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface FeedNavLinkProps {
  to: string;
  children: ReactNode;
  end?: boolean;
}

const FeedNavLink = (props: FeedNavLinkProps) => {
  return (
    <NavLink
      to={props.to}
      end
      className={({ isActive }) =>
        [
          'font-light text-lg transition hover:text-primary border-b-2 hover:border-primary py-2 px-1',
          isActive
            ? 'text-primary font-medium border-b-2 border-primary'
            : 'text-secondary border-transparent',
        ].join(' ')
      }
    >
      {props.children}
    </NavLink>
  );
};

export default FeedNavLink;
