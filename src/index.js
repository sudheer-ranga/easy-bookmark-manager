import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BookmarkStore } from './BookmarkStore';

window.addEventListener('message', function(data) {
  window.bookmarks = data.data;

  ReactDOM.render(
    <BookmarkStore>
      <App />
    </BookmarkStore>,
    document.getElementById('root')
  );
});
