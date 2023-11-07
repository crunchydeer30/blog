import { ReactNode } from 'react';

interface FeedNavProps {
  children: ReactNode;
  classes?: string[];
}

const FeedNav = (props: FeedNavProps) => {
  const classNames = ['flex', 'items-center', 'gap-4', 'border-b-[1px]', 'border-b-gray-200', 'overflow-y-auto'];
  if (props.classes) classNames.push(...props.classes);

  return (
    <nav className={classNames.join(' ')}>
      {props.children}
    </nav>
  );
};

export default FeedNav;
