import React,{useEffect} from "react";
import {fetchDetail, fetchMovie} from "../actions/movieActions";
// reducer에 있는 state를 갖고 들어온다.
import {connect} from 'react-redux'

function MovieDetail(props) {

    useEffect(()=>{
        props.fetchDetail(props.match.params.no); /* <== 값 받는 방식 이렇게 받음....  */
    },[])

    return(
        <div className={"row"}>
            영화 상세보기 : {props.match.params.no}
            <h1 className={"text-center"}>{props.detail.title} 상세보기</h1>
            <table className={"table"}>
                <tr>
                    <td width={"30%"} className={"text-center"} rowSpan={"5"}>
                        <img src={props.detail.poster} width={"100%"}/>
                    </td>
                </tr>
                <tr>
                    <td width={"70%"}>{props.detail.director}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{props.detail.actor}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{props.detail.genre}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{props.detail.grade}</td>
                </tr>
                <tr>
                    <td colSpan={"2"}>{props.detail.story}</td>
                </tr>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    detail:state.movies.detail
})
// 위의 함수는 아래의 코드와 기능이 같다.
// <MovieDetail detail={state.movies.detail}/>

export default connect(mapStateToProps,{fetchDetail})(MovieDetail)