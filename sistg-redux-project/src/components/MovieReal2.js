import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchMovie} from "../actions/movieActions";
import {NavLink} from "react-router-dom";

/* [방법2] useDispatch, useSelector 사용 */
function MovieReal2(props) {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchMovie(1,1));
    },[])
    /*
    deps가 없는 경우 => componentDidMount(), componentDidUpdate 호출 ==> 계~속 실행됨. 무한루프
    deps가 있는 경우 => componentDidMount() 딱 한 번만 호출하고 끝낸다.
    */

    const data=useSelector(state=>state.movies.movie);

    const html=data.map((m)=>
        <div className={"col-md-4"}>
            <div className="thumbnail">
                <NavLink to={"/movie_detail/"+m.no}>
                    <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                </NavLink>
                <div className="caption">
                    <p>{m.title}</p>
                </div>
            </div>
        </div>
    )

    return(
        <React.Fragment>
            <h3>방법2 - useDispatch, useSelector 사용 </h3>
            <h1 className={"text-center"}>현재 상영 영화</h1>
            <p>
                <NavLink to={"/movie_news"} className={"btn btn-s btn-danger"}>영화 뉴스</NavLink>
                <NavLink to={"/movie_news_pop"} className={"btn btn-s btn-warning"}>영화 인기 뉴스</NavLink>
            </p>
            {html}
        </React.Fragment>
    )

}

export default MovieReal2


