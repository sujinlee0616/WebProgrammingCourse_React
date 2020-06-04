import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchNews} from "../actions/foodActions";

// [방법1] Component(FoodNews.js) ==> Action(foodActions.js) ==> Reducer(foodReducer.js)

// ↓ 아래의 function FoodNews는 class 방식으로 React 짤 때의 render 함수와 같이 동작한다.
//  - 즉, state가 바뀌면 FoodNews.js의 FoodNews 함수가 자동으로 호출되어 re-render 된다.
export default function FoodNews(props) {   // 값을 받아와서 출력해야하니까 props 필요

    // [데이터 받음]
    // 1) 검색어(fd) set해서 보내줌
    const [fd,setFd]=useState('맛집'); // initial 값 넣어줌
    /* ■ useState
        - useState는 함수에 state를 제공한다.
        - initialState를 파라미터로 받고, state와 state를 변경할 setState 함수를 반환한다.
        - setFd로 fd의 state를 변경하면 re-rendering됨. */

    // 2) reducer에 전송할 dispatch 함수 생성 ==> dispatch 함수는 action에 매개변수로 넘어감
    const dispatch=useDispatch();
    /* ■ useDispatch
        - 데이터 요청
        - Redux store로부터 dispatch 함수에 대한 참조값(reference)를 리턴한다.
        - 참고) https://react-redux.js.org/7.1/api/hooks#usedispatch */

    // 3) fetchNews 함수 호출
    useEffect(()=>{
        console.log('FoodNews.js - useEffect : fetchNews 호출했음')
        dispatch(fetchNews(fd))  // foodAction.js의 fetchNews 함수 호출. fd에 초기값 넣은 상태로 함수호출함.
        // ===> foodActions.js의 fetchRecipe 함수는 foodReducer.js의 function을 자동호출하고, action에 값을 넣어준다.
    },[]) // deps: 변화가 있을 때만 다시 호출
    /* ■ useEffect
        - render가 발생할 때마다 effect가 실행된다.
        - 클래스 컴포넌트에서의 componentDidMount, componentDidUpdate, componentWillUnmount에 해당. */

    // 4) 변경한 state 갖고 온다
    const news_data=useSelector(state=>state.foods.news);  // foods: src/reducers/index.js의 foods // foods.news : foodReducer.js의 news:[]
    /* ■ useSelector
         - 요청한 데이터 얻기
         - mapStateToProps와 유사한 기능이며, store의 state의 데이터를 할당
         - Redux store의 state에서 데이터를 추출할 수 있게 해줌.
         - 참고) https://react-redux.js.org/7.1/api/hooks#useselector  */
    // 위의 코딩은 아래의 코딩 둘과 똑같다. 셋 중 아무거나 써도 됨.
    // const news_data=useSelector((state)=>state.foods.news); // 이렇게 (state)해도 똑같은 코딩임
    /* const news_data=useSelector(function(state){
           return state.foods.news
       })
    */

    // [return에서 불러올 HTML에 데이터값 넣어줌]
    const html=news_data.map((m)=>
        <table className={"table"}>
            <tbody>
                <tr>
                    <td><a href={m.link} target={"_blank"}>{m.title}</a></td>
                </tr>
                <tr>
                    <td>{m.description}</td>
                </tr>
                <tr>
                    <td className={"text-right"}>{m.author}</td>
                </tr>
            </tbody>
        </table>
    )
    // 위의 코딩은 아래의 코딩과 같다.
    /*
        const html=news_data.map((m)=>{
            return(
                <table className={"table"}>
                // ... 중략
                </table>
            )
        })
     */

    // [이벤트 처리]
    const onDataChange=(e)=>{
        setFd(e.target.value) // fd를 변경해줌
        console.log('onDataChange 발생. setFd(e.target.value).  fd='+fd)
    }
    const onBtnClick=(e)=>{
        dispatch(fetchNews(fd))
        /* dispatch: foodAction.js의 fetchNews 함수를 호출 ==> re-rendering됨 ==> 화면 바뀜 */
        console.log('onBtnClick 발생: dispatch(fetchNews(fd))')
    }

    // [화면 출력]
    return (
        <div className={"row"} style={{"margin": "0px auto", "width": "1200px"}}>
            <h1 className={"text-center"}>맛집 뉴스 - 방법1</h1>
            <h3 className={"text-center"}>Component(FoodNews.js) ==> Action(foodActions.js) ==> Reducer(foodReducer.js)</h3>
            <table className={"table"}>
                <tbody>
                <tr>
                    <td>
                        <input type={"text"} className={"input-sm"} size={"20"} onChange={onDataChange}/>
                        <button className={"btn btn-sm btn-primary"} onClick={onBtnClick}>검색</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        {html}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    )
}

