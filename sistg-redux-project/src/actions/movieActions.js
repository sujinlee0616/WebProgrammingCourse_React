import React from "react";
import {FETCH_MOVIE,FETCH_DETAIL,FETCH_NEWS,FETCH_NEWS_POP} from "./types";
import axios from 'axios';

// [영화 목록]: 배열
// fetchMovie 함수를 호출. page,type: 매개변수.
export const fetchMovie = (page,type) => dispatch => {
    axios.get('http://localhost:3355/movie_data',{
        params:{
            page:page,
            type:type
        }
    }).then(movies => dispatch({
        type:FETCH_MOVIE, // Java에서의 @RequestMapping("movie/list.do") 같은 것
        payload:movies.data
    }))
}

// [영화 상세]: 데이터 한 개만 가져오면됨
export const fetchDetail = (no) => dispatch => { // dispatch: Reducer로 값을 보냄.
    axios.get('http://localhost:3355/movie_detail',{
        params:{
            no:no
        }
    }).then(movies => dispatch({ // dispatch: Reducer로 값을 보냄.
        type:FETCH_DETAIL, // Java에서의 @RequestMapping("movie/detail.do") 같은 것
        payload:movies.data[0] // 배열의 첫번째 요소를 달라 <=== 왜냐면, [{}] 이렇게 값을 보냈기 때문.
    }))
}

// [영화 뉴스]: 배열
export const fetchNews=()=>dispatch=>{
    axios.get('http://localhost:3355/movie_news').then(news => dispatch({ // 'news' 테이블이 있음
        type:FETCH_NEWS, // Java에서의 @RequestMapping("movie/list.do") 같은 것
        payload:news.data
    }))
}

// [영화 인기 뉴스]: 배열
export const fetchNewsPop=()=>dispatch=>{
    axios.get('http://localhost:3355/movie_news_pop').then(news_pop => dispatch({ // 'news_pop' 테이블이 있음
        type:FETCH_NEWS_POP, // Java에서의 @RequestMapping("movie/list.do") 같은 것
        payload:news_pop.data
    }))
}




/*
    React(화면) ============> 액션 함수(ex.fetchMovie) 호출 ============> 처리된 내용을 저장(reducer)
                이벤트 발생(action)                                      - state에 저장 (setState())
                ex) 메뉴, 버튼, 값 입력                                   - render()
 */
/*
    React  ============>  Reducer  ============>  React
            dispatch                  state
                                       ┕ 마치 JSP에서의 request처럼 값을 전달함
                                         JSP의 viewResolver처럼 '구독(subscription)'이 있어서 View에 값을 보냄.

    JSP    ============>  Model(@Controller)  ============>  JSP
         dispatcherServlet  ┕ model.addAttribute(): request에 값을 싣으면, ViewResolver가 JSP에 request를 전송.
*/

