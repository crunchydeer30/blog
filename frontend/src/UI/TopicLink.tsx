import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface TopicLinkProps {
  children: ReactNode;
  to: string;
  classes?: string[];
}

const TopicLink = (props: TopicLinkProps) => {
  const classNames = [
    'inline-block',
    'w-fit',
    'bg-lightgray',
    'rounded-full',
    'transition',
    'hover:bg-lightgray-dark',
    'text-sm',
    'px-4',
    'py-2',
  ];

  if (props.classes?.length) classNames.push(...props.classes);

  return (
    <Link to={props.to} className={classNames.join(' ')}>
      {props.children}
    </Link>
  );
};

export default TopicLink;
