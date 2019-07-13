import React from 'react';
import './App.css';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

function App() {
  const bookmarks = window.bookmarks;

  const getFolders = bookmarks => {
    let dom = Object.keys(bookmarks).map(key => {
      if (!bookmarks[key].url) {
        return (
          <AccordionItem title={bookmarks[key].title}>
            {bookmarks[key].children ? getFolders(bookmarks[key].children) : ''}
          </AccordionItem>
        );
      }
    });

    return dom;
  };

  return (
    <div class="bookmark-container">
      <div class="sidebar">
        <Accordion atomic={false}>
          {getFolders(bookmarks[0].children)}
        </Accordion>
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
