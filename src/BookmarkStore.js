import React, { useReducer, createContext } from 'react';
import bookmarksJson from './bookmarks.js';

export const BookmarkContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_FOLDERS':
      return { ...state, currentFolders: action.payload };

    default:
      return state;
  }
};

export const BookmarkStore = props => {
  // const bookmarksJson = window.bookmarks;
  let firstBookmark = null;
  const json = bookmarksJson[0].children;

  Object.keys(json).some(key => {
    const childJson = json[key].children;

    let hasChildren = Object.keys(childJson).some(k => {
      if (childJson[k].children) {
        firstBookmark = childJson[k];
        console.log('firstBookmark: ', firstBookmark);
        return true;
      }

      return false;
    });

    return hasChildren;
  });

  const stateHooks = useReducer(reducer, {
    bookmarks: bookmarksJson,
    currentFolders: firstBookmark
  });

  return (
    <BookmarkContext.Provider value={stateHooks}>
      {props.children}
    </BookmarkContext.Provider>
  );
};
