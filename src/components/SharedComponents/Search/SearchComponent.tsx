import React, { useState } from 'react';
import * as S from './SearchComponent.style'

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

 function Search(props) {
  const [search, setSearch] = useState('');

  return (
   
    <S.SearchInput onChange={(e) => setSearch(e.target.value)} placeholder='Search Component' />

    )
}

export default Search;