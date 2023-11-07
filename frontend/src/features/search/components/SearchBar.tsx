import { useState } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import storageService from '../../../services/storageService';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';


const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') || '');
  const submit = useSubmit();

  useEffect(() => {
    setQ(searchParams.get('q') || '');
  }, [searchParams])
  
  return (
    <Form
      className="flex gap-4 items-center border-[1px] border-lightgray-dark rounded-3xl py-2 px-4"
      onSubmit={(e) => {
        e.preventDefault();
        storageService.saveSearchQuery(q);
        submit({q}, {method: 'get', action: '/search/posts'});
      }}
    >
      <svg className="w-4 h-4 fill-primary">
        <use href="/icons/sprite.svg#icon-search" />
      </svg>
      <input
        name="q"
        id="q"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
        className="outline-none bg-transparent flex-1"
        autoComplete="off"
      />
    </Form>
  );
};

export default SearchBar;
