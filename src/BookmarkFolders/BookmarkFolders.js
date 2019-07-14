import React, { useContext } from 'react';
import { BookmarkContext } from './../BookmarkStore';
import { ReactComponent as FolderIcon } from './../icons/folder.svg';
import './BookmarkFolders.scss';

function BookmarkFolders(props) {
  const { folders } = props;
  const [appState, doAction] = useContext(BookmarkContext);

  return (
    <React.Fragment>
      {Object.keys(folders).map(key => (
        <React.Fragment key={key}>
          {!folders[key].url ? (
            <div className="sub-folders">
              <h2
                onClick={() => {
                  doAction({
                    type: 'SET_CURRENT_FOLDERS',
                    payload: folders[key]
                  });
                }}
              >
                <span className="folder-icon">
                  {/* <img src="/images/icons/folder.svg" /> */}
                  <FolderIcon />
                </span>
                <span className="folder-title">{folders[key].title}</span>
              </h2>

              {folders[key].children ? (
                <BookmarkFolders folders={folders[key].children} />
              ) : null}
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default BookmarkFolders;
