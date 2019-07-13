import React from 'react';
import './BookmarkContent.css';

function BookmarkContent(props) {
  const { folders } = props;
  console.log('Current Folder: ', folders);

  return (
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci labore
      rerum quia amet beatae! Maiores iste, eum sit cum debitis suscipit, in
      distinctio nihil error quaerat consequatur officia, saepe assumenda?
    </p>
  );
}

export default BookmarkContent;
