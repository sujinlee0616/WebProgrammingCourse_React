import {FETCH_NEWS, FETCH_RECIPE} from "./types";
import axios from 'axios';

// [fetchNews]
export const fetchNews=(fd)=>dispatch=>{ // 함수(fetchNews) 안에 함수(dispatch)를 받은 것...
    // dispatch: reducer에게 값(type,payload)을 전달
    // ===> foodReducer.js의 function(state=initialState,action)을 자동호출함)
    //      : 이 function은 state의 값을 변경함
    // ===> store: 변경된 state 값을 저장함.
    console.log('foodActions.js - fetchNews 함수 실행. fd='+fd)
    console.log('액션함수:'+dispatch) // <== console 확인하면 dispatch가 함수임을 알 수 있음
    axios.get('http://localhost:3355/news',{
        params:{
            fd:fd // fd: 검색어
        }
    }).then(news=>dispatch({ // .then((news)=>dispatch({... 이렇게 해도 됨
        type:FETCH_NEWS, // ☆☆☆ type: Java에서의 @RequestMapping("/news.do")와 동일한 역할 ☆☆☆
        payload:news.data
        // reducer는 type이 FETCH_NEWS 일 때, payload값인 news.data 값을 저장한다.
    }))
}
// 위의 함수는 아래와 같이도 코딩할 수 있다.
/*
export function fetchNews(fd){
    console.log("fetchNews Call..")
    // Redux라이브러리에 디스패치 메서드를 함수에 인수로 보내서
    // 함수가 직접 액션을 보낼 수 있도록 한다.
    return function(dispatch){    // <=== dispatch는 함수이지만 함수의 인수로 썼음.
        //console.log(dispatch)
        // 데이터 갱신.
        axios.get('http://localhost:3355/news',{
            params:{
                fd:fd
            }
        }).then(news=>dispatch({ // 갱신된 데이터를 reducer에 전송. (type, payload)
            type:FETCH_NEWS,
            payload:news.data
        }))
        // 함수가 직접 액션을 보낼 수 있도록 한다.
    }
}
 */


// [fetchRecipe]
export const fetchRecipe=(page)=>dispatch=>{
    console.log('foodActions.js - fetchRecipe')
    axios.get('http://localhost:3355/recipe',{
        params:{
            page:page
        }
    }).then(recipes=>dispatch({
        type:FETCH_RECIPE,
        payload:recipes.data
    }))
}


/* ★★★★ [전체 Flow] ★★★★★
   1. React Component: 화면 UI. 이벤트 발생(ex. 클릭, 해당 화면 켜짐)
   2. Action:
     - actions 폴더의 foodAction.js
     - 이벤트가 발생하면 데이터를 읽고, (axios 라이브러리 사용해서 유저가 입력한 검색어 'fd'를 받았음)
       ★dispatch★ 함수를 사용해서 값을 채우고, ★reducer에게 값을 전달함★ (xxReducer.js의 function을 자동호출함)
   3. Reducer: state값을 변경함.
     - foodReducer.js 파일.
     - foodAction.js 파일로부터 값을 전달받음.
     - function(stae,action) 을 갖고 있는데, action에 dispatch가 보내준 값 (위의 경우에는 type, payload)을 갖고 있다.
     - reducers 폴더의 ..Reducer.js 파일에서 ★★state 값을 변경함★★
   4. 변경된 state 값을 저장.
     - 클라이언트에게 state를 넘겨줌 ==> 데이터 출력
   ※ state: 값을 싣는다. ==> Java에서의 request와 비슷한 역할.
 */


/* [선생님 설명]
 - Redux는 프론트계의 MVC 구조이다.
 - Spring MVC 구조와 React의 Redux는 아래와 같이 매칭된다.
   JSP   ===> DispatcherServlet  ===> @RequestMapping ===> DAO       ===> request
   React ===>    store           ===>   action        ===> reducer   ===> state
 */



/* [참고] JavaScript 문법
 - 아래의 방법1~방법3은 모두 같은 코딩이다.
 방법1. Arrow function: 1) function과 2) return이 생략됨
     data.map((m)=>
     )
 방법2.
     data.map(function(m){
        return (
        )
     })
 방법3.
     data.map((m)=>{
        return (
        )
     })
 */

// JavaScript 함수 안에 함수 호출
// https://beny-pitapat.tistory.com/52




