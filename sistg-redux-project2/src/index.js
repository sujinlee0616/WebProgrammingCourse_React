import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 2020.06.03(수)
import {Provider} from "react-redux";
import {store as store} from './store/store';

ReactDOM.render(
    <Provider store={store}>  {/* Provider가 store를 <App/>의 모든 곳에서 사용할 수 있도록 해준다. */}
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
