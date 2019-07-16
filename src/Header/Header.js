import React, { useState, useContext } from 'react';
import './Header.scss';
import { BookmarkContext } from './../BookmarkStore';
import { debounce, getJsonAsArray } from '../util';
import Fuse from 'fuse.js';

function Header() {
  const [appState] = useContext(BookmarkContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalOpened, setSearchModalOpened] = useState(false);
  const [fuse, setFuse] = useState(null);

  const openSearchModal = () => {
    setSearchModalOpened(true);

    let bookmarksToArray = [];
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ['title', 'url']
    };

    getJsonAsArray(appState.bookmarks, bookmarksToArray);
    let fuse = new Fuse(bookmarksToArray, options);

    setFuse(fuse);
  };

  const closeSearchModal = () => {
    setSearchModalOpened(false);
    setSearchResults([]);
  };

  const searchBookmarks = e => {
    let searchString = e.target.value;
    console.log('length: ', searchString.split('').length);
    if (searchString && !(searchString.split('').length > 2)) {
      return;
    }

    const results = fuse.search(searchString);
    console.log('Search Result: ', results);
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
            <form>
              <input
                type="search"
                className="modal-search-input"
                placeholder="Search Bookmarks"
                onChange={searchBookmarks}
                autoFocus
              />
            </form>
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
