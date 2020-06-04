import {FETCH_NEWS,FETCH_RECIPE,FETCH_CATEGORY,FETCH_CATE_FOOD} from "../actions/types";

// 전역변수처럼, 아무곳에서나 다 쓸 수 있음
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

// reducer는 stat를 변경함★★★
export default function (state=initialState,action) {
    console.log('Reducer Call... action 전송받음')
    switch (action.type) {
        case FETCH_NEWS:
            return{
                ...state,
                news:action.payload
            }
        case FETCH_RECIPE:
            return{
                ...state, // '...': 스프레드 연산자: 기존의 state에 recipe:action.payload를 복사하라
                recipe:action.payload
            }
        case FETCH_CATEGORY:
            return{
                ...state,
                category:action.payload
            }
        case FETCH_CATE_FOOD:
            return{
                ...state,
                food:action.payload
            }
        default:
            return state  // 변경한 state는 store로 가서 저장됨 ★★★
    }

}

/*
    React ==> 이벤트 발생 (시작하는 것도 이벤트임. 시작하면 초기값 가져옴) ==> action을 보냄 (action에서는 type과 payload 데이터를 갖고 있음)
    ==> reducer에게 데이터가 넘어가면, 데이터를 받아서 state 값을 변경시킴 ===> re-rendering됨. ==> 화면 변경됨.
 */


