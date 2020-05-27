import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App3 from './App3';
import * as serviceWorker from './serviceWorker';

// 1) JSON, 2) 배열, 3) 일반데이터 넘길 수 있음.
ReactDOM.render(
  <React.StrictMode>
    <App3 name={"홍길동"} sex={"남자"} age={"30"} /> {/*호출*/}
    {/* name,sex,age는 App3.js가 props(속성)으로 데이터 받는다. */}
  </React.StrictMode>,
  document.getElementById('root') // #root 에다가 내용을 뿌려라
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
