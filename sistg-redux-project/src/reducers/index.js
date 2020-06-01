import {combineReducers} from "redux";
import movieReducer from "./movieReducer";
export default combineReducers({
    movies:movieReducer
})

/* export default combineReducers 안에 여러개가 들어갈 수 있다.
    ex)
    export default combineReducers({
       movies:movieReducer,
       bard:...
    })
*/