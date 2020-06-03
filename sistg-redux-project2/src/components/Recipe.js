import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchRecipe} from "../actions/foodActions";

export default function Recipe(props) {  // 값을 받아와서 출력해야하니까 props 필요

    // [데이터 받음]
    // 페이지 set해서 보내줌
    const [page,setPage]=useState('1'); // 값 초기화: 페이지 초기값으로 1 넣어줌
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchRecipe(page)) // foodAction.js의 fetchRecipe 함수 호출. page에 초기값 넣은 상태로 함수호출함.
        // ===> foodActions.js의 fetchRecipe 함수는 foodReducer.js의 function을 자동호출하고, action에 값을 넣어준다.
    },[])
    //
    const recipe_data=useSelector(state=>state.foods.recipe); // recipe_data의 state를

    // [return에서 불러올 HTML에 데이터값 넣어줌]
    const html=recipe_data.map((m)=>
        <div className="col-md-4">
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
        <div className={"row"} style={{"margin": "0px auto", "width": "900px"}}>
            {html}
        </div>
    )
}