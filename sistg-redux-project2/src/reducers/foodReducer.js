import {FETCH_NEWS} from "../actions/types";

const initialState={
    news:[],  // 여러개의 데이터 ==> 배열로
    recipe:[],
    category:[],
    food:[],
    food_detail:{},  // 데이터 한 개니까 object로
    recipe_detail:{},
    pop_food:[],
    recommend_food:[]
}


export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_NEWS:
            return{
                ...state,
                news:action.payload
            }
        default:
            return state
    }

}