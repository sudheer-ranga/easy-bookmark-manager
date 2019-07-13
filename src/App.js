import React from 'react';
import './App.css';

function App() {
  console.log('Bookmarks: ', window.bookmarks);
  return (
    <div class="bookmark-container">
      <div class="sidebar">
        <ul>
          <li>Item 1</li>
          <li>
            Item 2
            <ul>
              <li>Item 2.1</li>
              <li>Item 2.2</li>
            </ul>
          </li>
          <li>Item 3</li>
        </ul>
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
