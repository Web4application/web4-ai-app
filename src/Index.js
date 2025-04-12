import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import ChatApp from './ChatApp';

// Render the ChatApp component into the root div
ReactDOM.render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>,
  document.getElementById('root')
);
