import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.addEventListener('message', function(data) {
  window.bookmarks = data.data;

  ReactDOM.render(<App />, document.getElementById('root'));
});
