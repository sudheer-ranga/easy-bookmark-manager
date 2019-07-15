import React, { useContext } from 'react';
import './App.scss';
import BookmarkFolders from './BookmarkFolders/BookmarkFolders';
import BookmarkContent from './BookmarkContent/BookmarkContent';
import { BookmarkContext } from './BookmarkStore';

function App() {
  const [appState] = useContext(BookmarkContext);
  const bookmarkChildrens = appState.bookmarks[0].children;

  return (
    <div className="bookmark-container">
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
