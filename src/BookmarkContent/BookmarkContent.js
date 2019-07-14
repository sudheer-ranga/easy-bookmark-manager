import React, { useContext } from 'react';
import { BookmarkContext } from './../BookmarkStore';
import { ReactComponent as FolderIcon } from './../icons/folder.svg';
import { ReactComponent as LinkIcon } from './../icons/link.svg';
import './BookmarkContent.scss';

function BookmarkContent(props) {
  const [appState, doAction] = useContext(BookmarkContext);

  const currentFolders = appState.currentFolders;
  console.log('object: ', currentFolders);
  const folders = currentFolders && currentFolders.children;

  return (
    <div className="bookmark-content">
      {folders &&
        Object.keys(folders).map(key => {
          if (!folders[key].children && folders[key].url) {
            return (
              <div className="bookmark-card" key={key}>
                <p className="bookmark-link">
                  {/* <LinkIcon className="link-icon" /> */}
                  <a className="link-text" href={folders[key].url} target="_blank">
                    {folders[key].title}
                  </a>
                </p>
              </div>
            );
          } else if (folders[key].children && !folders[key].url) {
            return (
              <div className="bookmark-card" key={key}>
                <p className="bookmark-folder" onClick={() => {
                  doAction({
                    type: 'SET_CURRENT_FOLDERS',
                    payload: folders[key]
                  });
                }}>
                  <span className="folder-icon">
                    <FolderIcon />
                  </span>
                  <span className="folder-name">{folders[key].title}</span>
                </p>
              </div>
            );
          }

          return null;
        })}
    </div>
  );
}

export default BookmarkContent;
