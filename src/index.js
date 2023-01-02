import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "@draft-js-plugins/alignment/lib/plugin.css";
import "@draft-js-plugins/undo/lib/plugin.css";
import "@draft-js-plugins/anchor/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "@draft-js-plugins/focus/lib/plugin.css";
import "@draft-js-plugins/text-alignment/lib/plugin.css";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import "@draft-js-plugins/image/lib/plugin.css";
import "draft-js-mention-plugin/lib/plugin.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

