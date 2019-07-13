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

  // const getFolders = bookmarks => {
  //   let dom = Object.keys(bookmarks).map(key => {

  //     if (!bookmarks[key].url) {
  //       return (
  //         <AccordionItem title={bookmarks[key].title}></AccordionItem>
  //       );
  //     }
  //   });

  //   dom = <Accordion atomic={false}>{dom}</Accordion>;
  //   return dom;
  // };

  // if (bookmarks[key].children) {
  //   let nestedDom = getFolders(bookmarks[key].children);

  //   innerDom = <Accordion atomic={false}>{nestedDom}</Accordion>;
  // }

  // let sidebarDom = getFolders(bookmarks[0].children);

  // const theBookmarks = bookmarks[0].children;

  return (
    <div class="bookmark-container">
      <div class="sidebar">
        <Accordion atomic={false}>
          {getFolders(bookmarks[0].children)}
        </Accordion>
        {/* <div dangerouslySetInnerHTML={{ __html: sidebarDom }} /> */}

        {/* <Accordion atomic={false}>
          <AccordionItem title="Title 1">
            <p>Hello 1</p>
          </AccordionItem>

          <AccordionItem title="Title 2">
            <p>Hello 2</p>
          </AccordionItem>

          <AccordionItem title="Title 3">
            <p>Hello 3</p>
          </AccordionItem>
        </Accordion> */}
        {/* <Accordion atomic={false}>
          {Object.keys(theBookmarks).map(key => {
            if (!theBookmarks[key].url) {
              return (
                <AccordionItem title={theBookmarks[key].title}>
                  {theBookmarks[key].children
                    ? getFolders(theBookmarks[key].children)
                    : ''}
                </AccordionItem>
              );
            }
          })}
        </Accordion> */}
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
