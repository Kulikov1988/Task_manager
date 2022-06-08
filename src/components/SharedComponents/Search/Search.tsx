import React from 'react';
import * as S from './SearchComponent.style';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
}

function Search({ setSearch, search, ...rest }: SearchProps) {
  const clearInput = () => {
    setSearch('');
  };

  return (
    <>
      <S.SearchInput
        {...rest}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search Component'
      />
      <span onClick={clearInput}> x</span>
    </>
  );
}

export default Search;
