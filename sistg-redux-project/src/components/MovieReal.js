import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";
import {fetchMovie,fetchDetail} from "../actions/movieActions";
import {NavLink} from "react-router-dom";

function MovieReal(props) {
    useEffect(()=>{
        props.fetchMovie(1,1);
    },[])

    const html=props.movies.map((m)=>
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
            <h1 className={"text-center"}>현재 상영 영화</h1>
            {html}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    movies:state.movies.movie
})
// 위의 함수는 아래의 코드와 기능이 같다.
// <MovieReal movie={state.movies.movie}/>

export default connect(mapStateToProps,{fetchMovie})(MovieReal)

