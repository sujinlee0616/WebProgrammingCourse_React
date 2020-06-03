import {createStore,applyMiddleware,compose} from "redux";  // compose: 묶어서 한 번에 동작하라. 합성.
import thunk from "redux-thunk"; // thunk: 비동기화
import rootReducer from '../reducers';
import {createLogger} from "redux-logger/src";  // reducer폴더의 index.js에 있는 reducer가 rootReducer임

const logger=createLogger();
const initialState={};

const middleware=[thunk,logger];

export const store=createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
)






