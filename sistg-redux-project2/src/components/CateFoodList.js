import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import axios from 'axios';
import {FETCH_CATE_FOOD} from "../actions/types";

// [카테고리별 음식점 출력]

export default function CateFoodList(props) {
    const dispatch=useDispatch();
    useEffect(()=>{
        axios.get('http://localhost:3355/cate_food', { // http://localhost:3355/cate_food?cno=1 하면 데이터 주는거 볼 수 있다.
            params: {
                cno: props.match.params.cno
                // 데이터를 받을 때는 cate_food?cno=1 요런 식으로 ? 해서 받아왔지만
                // 컴포넌트(CateFoodList)에서 컴포넌트(FoodDetail(??))로 cno 데이터 넘길 때는 cate_food/1 이런식으로 넘긴다.
            }
        }).then((result)=>{
            dispatch({
                type:FETCH_CATE_FOOD,
                payload:result.data
            })
        })
    },[])

    const food_data=useSelector((state)=>state.foods.food); // foods: src/reducers/index.js의 foods // foods.news : foodReducer.js의 food:[]

    // [return에서 불러올 HTML에 데이터값 넣어줌]
    const html=food_data.map((m)=>
        <table className={"table"}>
            <tbody>
                <tr>
                    <td width={"30%"} rowSpan={"3"} className={"text-center"}>
                        <img src={m.image.substring(0,m.image.indexOf(','))} width={"100%"}/>
                    </td>
                    <td width={"70%"}>{m.title} <span style={{"color":"orange"}}>{m.score}</span></td>
                </tr>
                <tr>
                    <td>주소:{m.address}</td>
                </tr>
                <tr>
                    <td>전화:{m.tel}</td>
                </tr>
            </tbody>
        </table>
    )

    return(
        <div className={"row"} style={{"margin":"0px auto","width":"700px"}}>
            <table className={"table"}>
                <tbody>
                    <tr>
                        <td>{html}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

