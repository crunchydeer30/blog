import { Link } from 'react-router-dom';
import { Topic } from '../../../types';

interface TopicLinkProps {
  topic: Topic;
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
    <Link to={`/topics/${props.topic.id}`} className={classNames.join(' ')}>
      {props.topic.title}
    </Link>
  );
};

export default TopicLink;
