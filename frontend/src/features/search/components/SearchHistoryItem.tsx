import { Link } from 'react-router-dom';
import storageService from '../../../services/storageService';
import { useQueryClient } from '@tanstack/react-query';

interface SearchHistoryItemProps {
  query: string;
  classes?: string[];
}

const SearchHistoryItem = (props: SearchHistoryItemProps) => {
  const classNames = [
    'flex',
    'justify-between',
    'gap-12',
    'items-center',
    'py-2',
    'border-b-[1px]',
    'border-b-gray-200',
  ];

  const queryClient = useQueryClient();

  if (props.classes) classNames.push(...props.classes);

  return (
    <li className={classNames.join(' ')}>
      <Link to={`/search/posts?q=${props.query}`} className='flex-1'>{props.query}</Link>
      <button
        onClick={() => {
          storageService.removeSearchQuery(props.query);
          queryClient.invalidateQueries({queryKey: ['searchHistory']});
        }}
      >
        <svg className="w-4 h-4 fill-secondary transition hover:fill-primary">
          <use href="/icons/sprite.svg#icon-close" />
        </svg>
      </button>
    </li>
  );
};

export default SearchHistoryItem;
