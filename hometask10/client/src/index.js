import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './App/Provider';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider />,
  document.getElementById('root')
);

registerServiceWorker();
