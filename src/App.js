import React from 'react';
import './App.css';

function App() {
  const bookmarks = window.bookmarks;
  let dom = '';

  const getFolders = bookmarks => {
    Object.keys(bookmarks).forEach(key => {
      if (!bookmarks[key].url) {
        dom += `<li>${bookmarks[key].title}</li>`;
        console.log(bookmarks[key].title);
      }

      if (bookmarks[key].children) {
        dom += '<ul>';
        getFolders(bookmarks[key].children);
        dom += '</ul>';
      }
    });
  };

  getFolders(bookmarks[0].children);

  dom = `<ul>${dom}</ul>`;

  return (
    <div class="bookmark-container">
      <div class="sidebar">
        <div dangerouslySetInnerHTML={{ __html: dom }} />
      </div>
      <div class="content">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci
          labore rerum quia amet beatae! Maiores iste, eum sit cum debitis
          suscipit, in distinctio nihil error quaerat consequatur officia, saepe
          assumenda?
        </p>
      </div>
    </div>
  );
}

export default App;
