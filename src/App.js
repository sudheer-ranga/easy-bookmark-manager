import React, { useState } from 'react';
import './App.css';
import bookmarks from './bookmarks.js';
import BookmarkFolders from './BookmarkFolders/BookmarkFolders';
import BookmarkContent from './BookmarkContent/BookmarkContent';

function App() {
  const theBookmarks = bookmarks[0].children;
  const bookmarkKeys = Object.keys(theBookmarks);
  const [currentFolders, setCurrentFolders] = useState(null);

  return (
    <div className="bookmark-container">
      <div className="sidebar">
        {bookmarkKeys.map(id => (
          <div className="bookmark-block" key={id}>
            <h3 className="chrome-folders-name">{theBookmarks[id].title}</h3>

            {theBookmarks[id].children ? (
              <BookmarkFolders folders={theBookmarks[id].children} />
            ) : null}
          </div>
        ))}
      </div>
      <div className="content">
        <BookmarkContent folders={currentFolders} />
      </div>
    </div>
  );
}

export default App;
