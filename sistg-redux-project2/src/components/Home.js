import React, {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {FETCH_CATEGORY} from "../actions/types";
import axios from 'axios'
import {NavLink} from "react-router-dom";

/*
    useDispatch ==> 데이터 요청
    useSelector ==> 요청한 데이터 얻기
 */

// [방법2] Componetn ==> Reducer (Action 거치지 않음)
// Home.js에서는 방법1,2 중에 방법2를 사용하겠다.
// 방법1과 방법2의 차이는 FoodNews.js와 FoodNews2.js 비교하면서 볼 것.

export default function Home(props) {  // 값을 받아와서 출력해야하니까 props 필요
    const dispatch=useDispatch(); // reducer를 연결 ==> action ==> {type,payload}
    useEffect(()=>{
        axios.get('http://localhost:3355/category') // 보내는 데이터 없으니까 params 없음
            .then((result)=>{
                dispatch({
                    type:FETCH_CATEGORY,
                    payload:result.data
                })
            })
    },[]) // componentWillMount
    const cate_data=useSelector(state=>state.foods.category) // foods: src/reducers/index.js의 foods // foods.news : foodReducer.js의 category:[]
    // 위의 코딩은 아래와 똑같다.
    /* const news_data=useSelector(function(state){  // state: store에 저장된 state
           return state.foods.news
       })
    */

    // [return에서 불러올 HTML에 데이터값 넣어줌]
    const html=cate_data.map((m)=>{
        return (
            <div className="col-md-4">
                <div className="panel panel-warning">
                    <div className="panel-heading" style={{"height":"140px"}}>
                        <h3>{m.title}</h3>
                        <sub>{m.subject}</sub>
                    </div>
                    <div className="panel-body">
                        <div className="thumbnail">
                            <NavLink to={"/cate_food/"+m.cateno}>
                                <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    // 위의 코딩은 아래의 코딩과 같다.
    /*
        const html=cate_dat.map((m)=>
            <div className="panel panel-warning">
            // ...중략
            </div>
        )
     */

    return(
        <div className={"row"} style={{"margin": "0px auto", "width": "1200px"}}>
            <h1 className={"text-center"} style={{"marginBottom": "50px"}}>믿고 보는 맛집 리스트</h1>
            {html}
        </div>
    )
}


/*
<div class="col-md-4">
    <div class="thumbnail">
      <a href="/w3images/lights.jpg">
        <img src="/w3images/lights.jpg" alt="Lights" style="width:100%">
        <div class="caption">
          <p>Lorem ipsum...</p>
        </div>
      </a>
    </div>
  </div>
 */