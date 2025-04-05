import React from 'react';
import './searchbar.scss';

function SearchBar({searchTerm, setSearchTerm}) {
  return (
    <div class='search-bar'>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
