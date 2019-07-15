/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BookmarkStore } from './BookmarkStore';
import { generateBookmarksJson } from './util';

ReactDOM.render(
  <BookmarkStore>
    <App />
  </BookmarkStore>,
  document.getElementById('root')
);

// document.addEventListener('DOMContentLoaded', function() {
//   chrome.bookmarks.getTree(bookmarkTreeNodes => {
//     const bookmarks = generateBookmarksJson(bookmarkTreeNodes);
//     window.bookmarks = bookmarks;

//     ReactDOM.render(
//       <BookmarkStore>
//         <App />
//       </BookmarkStore>,
//       document.getElementById('root')
//     );
//   });
// });
