import React from 'react';
import * as S from './SearchComponent.style';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  
} 

function Search({ setSearch, ...rest }: SearchProps) {
  const clearInput = () => {
    setSearch('')
  }

  return (
    <>
      <S.SearchInput
        {...rest}
        
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search Component'
        type='search'
      />
      <span onClick={clearInput}> x</span>
    </>
  );
}

export default Search;
