import React, { useContext } from 'react';
import BookmarkFolders from './BookmarkFolders/BookmarkFolders';
import BookmarkContent from './BookmarkContent/BookmarkContent';
import { BookmarkContext } from './BookmarkStore';
import Header from './Header/Header';
import './App.scss';

function App() {
  const [appState] = useContext(BookmarkContext);
  const bookmarkChildrens = appState.bookmarks;

  const openSearchModal = () => {};

  return (
    <div className="bookmark-container">
      <Header />

      <div className="sidebar">
        {Object.keys(bookmarkChildrens).map(id => (
          <div className="bookmark-block" key={id}>
            <h3 className="chrome-folders-name">
              {bookmarkChildrens[id].title}
            </h3>

            {bookmarkChildrens[id].children ? (
              <BookmarkFolders folders={bookmarkChildrens[id].children} />
            ) : null}
          </div>
        ))}
      </div>
      <div className="content">
        <BookmarkContent />
      </div>
    </div>
  );
}

export default App;
