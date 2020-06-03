import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from '../reducers';
import {createLogger} from "redux-logger/src";

const logger=createLogger();
const initialState={};
const middleware=[thunk,logger];

const store=createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // devtool
)

export default store;

// Devtool: http://extension.remotedev.io/#usage
// 개발자 도구에서 저거 안 나오는 것 같은데...? 좀 더 알아보자.




