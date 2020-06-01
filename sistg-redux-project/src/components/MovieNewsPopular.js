import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchNewsPop} from "../actions/movieActions";

/* 인기뉴스 */
/* 테이블명: news_pop */

export default function MovieNewsPop(props) {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchNewsPop())
    },[])

    const data=useSelector(state=>state.movies.news);
    const html=data.map((m)=>
        <table className={"table"}>
            <tbody>
            <tr>
                <td><a href={m.link} target={"_blank"}><b>{m.title}</b></a></td>
            </tr>
            <tr>
                <td>{m.content}</td>
            </tr>
            <tr>
                <td className={"text-right"}>{m.author}</td>
            </tr>
            </tbody>
        </table>
    )

    return(
        <table className={"table"}>
            <h1 className={"text-center"}>영화 인기 뉴스</h1>
            <tbody>
            <tr>
                <td>{html}</td>
            </tr>
            </tbody>
        </table>
    )

}