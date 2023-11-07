import { Link } from 'react-router-dom';

interface MobileNavLinkProps {
  children: React.ReactNode;
  to: string;
  icon: string;
}

const MobileNavLink = (props: MobileNavLinkProps) => {
  return (
    <Link className="flex gap-4 px-4 py-3 items-center border-b-[1px] border-b-gray-200" to={props.to}>
      <svg className='w-6 h-6 fill-primary'>
        <use
          href={`/icons/sprite.svg#icon-${props.icon}`}
        />
      </svg>
      <span>{props.children}</span>
    </Link>
  );
};

export default MobileNavLink;
