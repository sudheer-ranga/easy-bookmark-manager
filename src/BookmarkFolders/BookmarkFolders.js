import React, { useState } from 'react';
import './BookmarkFolders.css';

function BookmarkFolders(props) {
  const { folders } = props;
  const [currentFolders, setCurrentFolders] = useState(null);

  return (
    <React.Fragment>
      {Object.keys(folders).map(key => (
        <React.Fragment key={key}>
          {!folders[key].url ? (
            <div className="sub-folders">
              <h2
                onClick={() => {
                  setCurrentFolders(folders[key]);
                  console.log('Current Folder: ', folders[key]);
                }}
              >
                {folders[key].title}
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
