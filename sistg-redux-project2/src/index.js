import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';   // bundle.js 하려면 css 있으면 안 됨
import App from './App';
// import * as serviceWorker from './serviceWorker'; // bundle.js 하려고 내부에서 사용한 웹팩 주석처리했음

// 2020.06.03(수)


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// serviceWorker.unregister(); // bundle.js 하기 위해 주석처리

