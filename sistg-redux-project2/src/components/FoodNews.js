import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchNews} from "../actions/foodActions";

export default function FoodNews(props) {  // <== 얘가 render 처럼 작동  // 값을 받아와서 출력해야하니까 props 필요

    // [데이터 받음]
    // 검색어(fd) set해서 보내줌
    const [fd,setFd]=useState('맛집'); // initial 값 넣어줌
    const dispatch=useDispatch(); // reducer를 호출
    useEffect(()=>{
        dispatch(fetchNews(fd))  // foodAction.js의 fetchNews 함수 호출. fd에 초기값 넣은 상태로 함수호출함.
        // ===> foodActions.js의 fetchRecipe 함수는 foodReducer.js의 function을 자동호출하고, action에 값을 넣어준다.
    },[]) // deps: 변화가 있을 때만 다시 호출
    const news_data=useSelector(state=>state.foods.news);  // foods: src/reducers/index.js의 foods

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
        /*console.log('fd='+fd)*/
    }
    const onBtnClick=(e)=>{
        dispatch(fetchNews(fd))
        /* dispatch: foodAction.js의 fetchNews 함수를 호출 ==> re-rendering됨 ==> 화면 바뀜 */
        /*console.log('버튼 클릭!')*/
    }

    // [화면 출력]
    return (
        <div className={"row"} style={{"margin": "0px auto", "width": "900px"}}>
            <h1 className={"text-center"}>맛집 뉴스</h1>
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