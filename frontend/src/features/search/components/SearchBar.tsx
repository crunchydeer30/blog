import { useState } from 'react';
import { Form, useSubmit } from 'react-router-dom';


const SearchBar = () => {
  const [q, setQ] = useState('');
  const submit = useSubmit();

  
  return (
    <Form
      className="flex gap-4 items-center border-[1px] border-lightgray-dark rounded-3xl py-2 px-4"
      onSubmit={(e) => {
        e.preventDefault();
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
