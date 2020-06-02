import {FETCH_NEWS} from "./types";
import axios from 'axios';

// [fetchNews]
export const fetchNews=(fd)=>dispatch=>{
    // dispatch: reducer에게 값을 전달 (xxReducer.js의 function을 자동호출함)
    // =====> reducer: state 값을 변경함.
    // ===> store: 변경된 state 값을 저장함.
    axios.get('http://localhost:3355/news',{
        params:{
            fd:fd
        }
    }).then(news=>dispatch({
        type:FETCH_NEWS, // type: Java에서의 @RequestMapping("/news.do")와 동일한 역할
        payload:news.data
        // reducer는 type이 FETCH_NEWS 일 때, payload값인 news.data 값을 저장한다.
    }))
}

/* [전체 Flow]
   1. React Component: 화면 UI. 이벤트 발생(ex. 클릭)
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
   JSP ===> DispatcherServlet ===> @RequestMapping ===> DAO ===> request
   React ===> store ===> action ===> reducer ===> state
 */








