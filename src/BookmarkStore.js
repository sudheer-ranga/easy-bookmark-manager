/*global chrome*/

import React, { useReducer, createContext } from 'react';
// import bookmarksJson from './bookmarks.js';
import { initialActiveBookmark } from './util';

export const BookmarkContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_FOLDER':
      return { ...state, currentFolder: action.payload };

    default:
      return state;
  }
};

export const BookmarkStore = props => {
  const bookmarksJson = window.bookmarks[0].children;

  let stateHooks = useReducer(reducer, {
    bookmarks: bookmarksJson,
    currentFolder: initialActiveBookmark(bookmarksJson)
  });

  return (
    <BookmarkContext.Provider value={stateHooks}>
      {props.children}
    </BookmarkContext.Provider>
  );
};
