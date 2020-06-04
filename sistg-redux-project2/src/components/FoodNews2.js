import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchNews} from "../actions/foodActions";

// [방법2] Component(FoodNews.js) ==> Reducer(foodReducer.js)
// - axios로 데이터 가져오는 부분이 반복됨.
//   ==> 데이터 가져오는 부분을 함수로 빼서 foodAction.js에다가 놓는게 1) 코딩 양도 적어지고 2) 유지보수도 쉬움

// [방법2] 1) import
import axios from 'axios';
import {FETCH_NEWS} from "../actions/types";

export default function FoodNews(props) {   // 값을 받아와서 출력해야하니까 props 필요

    const [fd,setFd]=useState('맛집');
    const dispatch=useDispatch();

    // [방법2] 2) 직접 가져오도록 바꿨음
    useEffect(()=>{
        //dispatch(fetchNews(fd))
        axios.get('http://localhost:3355/news',{
            params:{
                fd:fd
            }
        }).then((result)=>{
            dispatch({
                type:FETCH_NEWS,
                payload:result.data
            })
        })
    },[])

    const news_data=useSelector(state=>state.foods.news);

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

    // [이벤트 처리]
    const onDataChange=(e)=>{
        setFd(e.target.value)
        console.log('onDataChange 발생. setFd(e.target.value).  fd='+fd)
    }
    // [방법2] 3) 직접 가져오도록 바꿨음
    const onBtnClick=(e)=>{
        axios.get('http://localhost:3355/news',{
            params:{
                fd:fd
            }
        }).then((result)=>{
            dispatch({
                type:FETCH_NEWS,
                payload:result.data
            })
        })
    }

    // [화면 출력]
    return (
        <div className={"row"} style={{"margin": "0px auto", "width": "1200px"}}>
            <h1 className={"text-center"}>맛집 뉴스 - 방법2</h1>
            <h3 className={"text-center"}>Component(FoodNews.js) ==> Reducer(foodReducer.js)</h3>
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


