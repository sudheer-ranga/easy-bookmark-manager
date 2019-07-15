import React, { useState, useContext } from 'react';
import './Header.scss';
import { BookmarkContext } from './../BookmarkStore';
import { debounce, searchJson } from '../util';

function Header() {
  const [appState] = useContext(BookmarkContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalOpened, setSearchModalOpened] = useState(false);

  const openSearchModal = () => {
    setSearchModalOpened(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpened(false);
    setSearchResults([]);
  };

  const searchBookmarks = e => {
    // debugger;
    let searchString = e.target.value;
    console.log('length: ', searchString.split('').length);

    if (searchString && !(searchString.split('').length > 2)) {
      return;
    }

    let results = [];
    searchJson(appState.bookmarks, searchString, results);

    setSearchResults(results);
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <p className="logo-text">Bookmark Manager</p>
      </div>
      <div className="search-bar">
        {/* <input className="search-text" placeholder="Search Bookmarks" /> */}
        <p className="search-text" onClick={openSearchModal}>
          Search Bookmarks
        </p>
      </div>

      {searchModalOpened && (
        <div className="search-modal">
          <div className="close-modal">
            <span onClick={closeSearchModal}>x</span>
          </div>
          <div className="search-block">
            <input
              type="search"
              className="modal-search-input"
              placeholder="Search Bookmarks"
              onChange={searchBookmarks}
            />
          </div>
          <ul className="search-result-block">
            {searchResults.map((result, index) => (
              <li className="search-result-item" key={index}>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
