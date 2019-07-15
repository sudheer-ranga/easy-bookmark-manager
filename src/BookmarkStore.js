/*global chrome*/

import React, { useReducer, createContext } from 'react';
import bookmarksJson from './bookmarks.js';
import { initialActiveBookmark } from './util';

export const BookmarkContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_FOLDER':
      return { ...state, currentFolder: action.payload };
    case 'SET_BOOKMARKS':
      return { ...state, bookmarks: action.payload };
    case 'RENAME_FOLDER':
      console.log(action.payload);
      return state;

    default:
      return state;
  }
};

export const BookmarkStore = props => {
  // const bookmarksJson = window.bookmarks;
  window.bookmarks = bookmarksJson;

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
