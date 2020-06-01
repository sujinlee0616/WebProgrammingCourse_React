import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchDetail} from "../actions/movieActions";
import MovieReal2 from "./MovieReal2";
// useDispatch: Action에 등록된 함수를 호출할 때 사용
// useSelector: state 중에 필요한 데이터를 얻어오는 Hooks

/* [방법2] useDispatch, useSelector 사용 */

function MovieDetail2(props) {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchDetail(props.match.params.no))
    },[])  // 한 번만 돌아라

    const detail=useSelector(state=>state.movies.detail);


    return(
        <div className={"row"}>
            <h3>방법2 - useDispatch, useSelector 사용 </h3>
            영화 상세보기 : {props.match.params.no}
            <h1 className={"text-center"}>{detail.title} 상세보기</h1>
            <table className={"table"}>
                <tr>
                    <td width={"30%"} className={"text-center"} rowSpan={"5"}>
                        <img src={detail.poster} width={"100%"}/>
                    </td>
                </tr>
                <tr>
                    <td width={"70%"}>{detail.director}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{detail.actor}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{detail.genre}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{detail.grade}</td>
                </tr>
                <tr>
                    <td colSpan={"2"}>{detail.story}</td>
                </tr>
            </table>
        </div>
    )

}

export default MovieDetail2
