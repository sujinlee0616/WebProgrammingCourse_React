import {combineReducers} from "redux";
import foodReducer from "./foodReducer";

/*  [combineReducer] ★★★
    - 기능이 너무 많으면 Reducer가 여러개가 됨 ==> 이 Reducer들을 묶어주는게 combineReducer.
    - 마치 Spring에서 Service가 DAO 여러개를 묶어주는 것과 비슷함.
    ex) foodReducer, recipeReducer, newsReducer 가 존재한다면 이 파일(src > reducers > index.js)에 아래와 같이 코딩함
    import foodReducer from "./foodReducer";
    import recipeReducer from "./recipeReducer";
    import newsReducer from "./newsReducer";
    export default combineReducers({
        foods:foodReducer,
        recipes:recipeReducer,
        news:newsReducer
    })
 */

export default combineReducers({
    foods:foodReducer
    // foods: foodRecuder.js ==> news[], recipe[], category[]... 등 모든 데이터를 모아놓은 것.
})

/*  [state 구조]
    state={
        foods:{    <==== 얘네는 모든 Component가 공통으로 쓰는 state.
                         이 외에도 FoodNews.js에서만 쓰는 fd도, Recipe.js에서만 쓰이는 page도 state에 저장된다.
            news:[],
            recipe:[],
            category:[],
            food:[],
            food_detail:{},
            recipe_detail:{},
            pop_food:[],
            recommend_food:[]
        }
    }
 */
