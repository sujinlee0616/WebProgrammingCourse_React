import {FETCH_MOVIE, FETCH_DETAIL, FETCH_NEWS, FETCH_NEWS_POP} from "../actions/types";

// VO를 잡기 - 저장한 데이터를 모아주자
const initialState={
    movie:[], // <== 영화목록(movie)는 데이터 여러개니까 배열로 [{},{},...]
    detail:{}, // <== 디테일은 데이터 한 개니까 {}
    news:[],
    news_pop:[]
}

// VO를 관리
export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_MOVIE:
            return {
                ...state,
                movie:action.payload
            };
        case FETCH_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case FETCH_NEWS:
            return {
                ...state,
                news: action.payload
            }
        case FETCH_NEWS_POP:
            return {
                ...state,
                news: action.payload
            }
        default:
            return state;
    }
}
/*
    '...': 스프레드 연산자. 값을 복사해오는(?)것이라고 생각하면 됨.
    const a=[1,2,3];
    const b=[...a]; <=== b에 a가 갖고 있는 값이 모두 들어감 ==> 결과: b=[1,2,3]
    const c=[4,5,...a] ==> 결과: c=[4,5,1,2,3]
*/

