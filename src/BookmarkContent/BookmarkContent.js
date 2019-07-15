import React, { useContext } from 'react';
import { BookmarkContext } from './../BookmarkStore';
import { ReactComponent as FolderIcon } from './../icons/folder.svg';
import './BookmarkContent.scss';

function BookmarkContent(props) {
  const [appState, doAction] = useContext(BookmarkContext);

  const currentFolder = appState.currentFolder;
  const folders = currentFolder && currentFolder.children;

  console.log('currentFolder: ', currentFolder);

  return (
    <div className="bookmark-content">
      <div className="input-name-block">
        <p className="main-folder-name">{currentFolder.title}</p>
      </div>

      {folders ? (
        Object.keys(folders).map(key => {
          if (!folders[key].children && folders[key].url) {
            return (
              <div className="bookmark-card" key={key}>
                <p className="bookmark-link">
                  <a
                    className="link-text"
                    href={folders[key].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {folders[key].title}
                  </a>
                </p>
              </div>
            );
          } else if (folders[key].children && !folders[key].url) {
            return (
              <div className="bookmark-card" key={key}>
                <p
                  className="bookmark-folder"
                  onClick={() => {
                    doAction({
                      type: 'SET_CURRENT_FOLDER',
                      payload: folders[key]
                    });
                  }}
                >
                  <span className="folder-icon">
                    <FolderIcon />
                  </span>
                  <span className="folder-name">{folders[key].title}</span>
                </p>
              </div>
            );
          }

          return null;
        })
      ) : (
        <div className="empty-folder-container">
          <p className="empty-folder-info">No bookmarks found in this folder</p>
        </div>
      )}
    </div>
  );
}

export default BookmarkContent;
