import React,{useState,useEffect} from "react";
import axios from 'axios'

/* [방법3] - ★★★ function & Hooks ★★★
*  - App4_ver1,App4_ver2 와 달리 class가 아니라 ★★★function★★★ 사용 (React ver.16 이후~)
*  ==> React lifecycle에 따른 함수(componentDidMount, ...) 사용 X. 몰라도 됨.
*  ==> 아니 그럼 setState 함수도 없는거 아녀?? 어케함?? ㅠㅠ ?? ==> Hooks ({useState,useEffect}) 사용
*   - useEffect: componentDidMount에 해당함
*   - userState: setState에 해당함
*   ====> ★★★'Hooks'★★★
*/

// <App5 movie={movie_data}/> 는 아래와 같은 거임.
// function App5(props){}

// <일반> 계속 폰트 색깔 바뀜
const H=()=>{
    const color=['red','pink','green','blue','yellow'];
    const no=parseInt(Math.random()*5); // 0~4
    return(
        <h1 className={"text-center"} style={{"color":color[no]}}>H: 일반 - 주간 박스오피스</h1>
    )
}

// <React.memo> refresh 했을 때 한 번만 폰트 색깔 바뀜
// 참고) https://reactjs.org/docs/react-api.html#reactmemo
// Java의 싱글톤과 비슷.
const H1=React.memo(()=>{
    const color=['red','pink','green','blue','yellow'];
    const no=parseInt(Math.random()*5); // 0~4
    return(
        <h1 className={"text-center"} style={{"color":color[no]}}>H1: React.memo - 주간 박스오피스</h1>
    )
})

function App5(props) {

    // ====================================================================================
    // <useState>: function에서 state를 사용할 수 있게 해줌. const [변수명,setter]=useState([]);
    // 참고 글) https://ko.reactjs.org/docs/hooks-state.html
    const [movie,setMovie]=useState([]);
    const [detail,setDetail]=useState({});
    const [show,setShow]=useState(false);

    // <useEffect>: componentDidMount와 componentDidUpdate, componentWillUnmount가 합쳐진 것.
    // 참고 글) https://ko.reactjs.org/docs/hooks-effect.html
    useEffect(()=>{
        axios.get('http://localhost:3000/weekly.json').then((result)=>{
            setMovie(result.data)
        })
    })
    // ====================================================================================
    // == ~ == 이 부분을 파일로 뺀다면 그게 Redux★★★

    const onMovieChange=(m)=>{
        setDetail(m);
        setShow(true);
        // 위의 코딩 두 줄은 App4에서의 아래의 코딩과 같음.
        // this.setState({detail:m,show:true})
    }

    const list_html=movie.map((m,key)=> // function: this가 없음 ===> this.props가 아니라 그냥 props.
        <div className="col-md-4" onClick={()=>onMovieChange(m)}>
            <div className="thumbnail">
                <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                <div className="caption">
                    <p>{m.title}</p>
                </div>
            </div>
        </div>
    )

    // HTML. return 안에 들어갈 수 있는 제어문은 한정적임. (삼항연산자 등) ==> return 안에 if문 쓸 수X.
    return(
        <div className={"row"}>
            <H/>
            <H1/>
            <div className={"col-sm-8"}>
                {list_html}
            </div>
            <div className={"col-sm-4"}>
                {show===true?<MovieDetail movie={detail}/>:null}
                {/* 처음에 아무것도 없을 때는 <MovieDetail/> 출력하지 않게 처리 */}
            </div>
        </div>
    )
}

// 위에서 넘겨준 값을 props로 받았다.
function MovieDetail(props) {
    return(
        <table className={"table"}>
            <tr>
                <td rowSpan={"5"} width={"30%"} className={"text-center"}>
                    <img src={props.movie.poster} width={"100%"}/> {/* 함수니까 this 존재하지 X ==> 'this.props'가 아니라 'props'  */}
                </td>
                <td width={"70%"}>
                    <b>{props.movie.title}</b> {/* 함수니까 this 존재하지 X ==> 'this.props'가 아니라 'props'  */}
                </td>
            </tr>
            <tr>
                <td>감독: {props.movie.director}</td>
            </tr>
            <tr>
                <td>출연: {props.movie.actor}</td>
            </tr>
            <tr>
                <td>평점: {props.movie.score}</td>
            </tr>
            <tr>
                <td>장르: {props.movie.genre}</td>
            </tr>
            <tr>
                <td colSpan={"2"}>
                    {props.movie.story}
                </td>
            </tr>
        </table>
    )
}

export default App5;