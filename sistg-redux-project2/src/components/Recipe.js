import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchRecipe} from "../actions/foodActions";

// ↓ 아래의 function Recipe class 방식으로 React 짤 때의 render 함수와 같이 동작한다.
//  - 즉, state가 바뀌면 Recipe.js의 Recipe 함수가 자동으로 호출되어 re-render 된다.
export default function Recipe(props) {  // 값을 받아와서 출력해야하니까 props 필요

    // [데이터 받음]
    // 1) 페이지 set해서 보내줌
    const [page,setPage]=useState('1'); // 값 초기화: 페이지 초기값으로 1 넣어줌
    /* ■ useState
        - useState는 함수에 state를 제공한다.
        - initialState를 파라미터로 받고, state와 state를 변경할 setState 함수를 반환한다.
        - setFd로 fd의 state를 변경하면 re-rendering됨. */

    // 2) reducer에 전송할 dispatch 함수 생성 ==> dispatch 함수는 action에 매개변수로 넘어감
    const dispatch=useDispatch();
    /* ■ useDispatch
    - Redux store로부터 dispatch 함수에 대한 참조값(reference)를 리턴한다.
    - 참고) https://react-redux.js.org/7.1/api/hooks#usedispatch */

    // 3) fetchRecipe 함수 호출
    useEffect(()=>{
        dispatch(fetchRecipe(page)) // foodAction.js의 fetchRecipe 함수 호출. page에 초기값 넣은 상태로 함수호출함.
        // ===> foodActions.js의 fetchRecipe 함수는 foodReducer.js의 function을 자동호출하고, action에 값을 넣어준다.
    },[])
    /* ■ useEffect
        - render가 발생할 때마다 effect가 실행된다.
        - 클래스 컴포넌트에서의 componentDidMount, componentDidUpdate, componentWillUnmount에 해당. */

    // 4) 변경한 state 갖고 온다
    const recipe_data=useSelector(state=>state.foods.recipe); // foods: src/reducers/index.js의 foods // foods.recipe : foodReducer.js의 recipe:[]
    /* ■ useSelector
         - 요청한 데이터 얻기
         - mapStateToProps와 유사한 기능이며, store의 state의 데이터를 할당
         - Redux store의 state에서 데이터를 추출할 수 있게 해줌.
         - 참고) https://react-redux.js.org/7.1/api/hooks#useselector  */
    // 위의 코딩은 아래의 코딩 둘과 똑같다. 셋 중 아무거나 써도 됨.
    // const recipe_data=useSelector((state)=>state.foods.recipe); // 이렇게 (state)해도 똑같은 코딩임
    /* const recipe_data=useSelector(function(state){
           return state.foods.recipe
       })
    */

    // [return에서 불러올 HTML에 데이터값 넣어줌]
    const html=recipe_data.map((m)=>
        <div className="col-md-4" style={{"height":"470px"}}>
            <div className="thumbnail">
                <img src={m.poster} alt="Nature" style={{"width": "100%"}}/>
                <div className="caption">
                    <p>{m.title}</p>
                </div>
            </div>
        </div>
    )

    // [화면 출력]
    return(
        <div className={"row"} style={{"margin": "0px auto", "width": "1200px"}}>
            {html}
        </div>
    )
}