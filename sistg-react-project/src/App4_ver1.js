import React,{Component} from "react";

/* [방법1] class 사용 - React lifecycle에 따른 함수(componentDidMount, ...) 알아야함 */
/* props로 JSON 데이터를 넣어줬음 */
class App4 extends Component{
    // <App4 movie={movie_data}/> ==> 자동으로 props에 값을 채워준다.
    // [생성자]: 
    // - 이벤트 등록, state 변수를 설정.
    // - 안 쓰면 자동으로 알아서 생성됨.
    constructor(props) {
        super(props);
        this.state={
            detail:{},
            show:false
        }
    }
    // [이벤트(클릭)]
    onMovieChange(m)
    {
        this.setState({detail:m,show:true}) // render()를 호출 ==> 새로운 데이터를 다시 출력
    }

    // [화면 출력]
    render() {
        // const movie_data=[{"actor":"(주연) 라미란, 김무열, 나문희, 윤경호","score":7.8, ....},{...},...]
        const list_html=this.props.movie.map((m,key)=> // map: 마치.. for each문처럼... ★★★ - 아래의 <forEach,map> 주석 참고
            <div className="col-md-4" onClick={this.onMovieChange.bind(this,m)}> {/* 이벤트 등록 시 bind 주의!! */}
                <div className="thumbnail">
                    <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                    <div className="caption">
                        <p>{m.title}</p>
                    </div>
                </div>
            </div>
         )

        // HTML
        return(
            <div className={"row"}>
                <div className={"col-sm-8"}>
                    {list_html}
                </div>
                <div className={"col-sm-4"}>
                    {this.state.show==true?<MovieDetail movie={this.state.detail}/>:null}
                    {/* 처음에 아무것도 없을 때는 <MovieDetail/> 출력하지 않게 처리 */}
                </div>
            </div>
        )
    }

}

class MovieDetail extends Component{
    render()
    {
        return(
            <table className={"table"}>
                <tr>
                    <td rowSpan={"5"} width={"30%"} className={"text-center"}>
                        <img src={this.props.movie.poster} width={"100%"}/>
                    </td>
                    <td width={"70%"}>
                        <b>{this.props.movie.title}</b>
                    </td>
                </tr>
                <tr>
                    <td>감독: {this.props.movie.director}</td>
                </tr>
                <tr>
                    <td>출연: {this.props.movie.actor}</td>
                </tr>
                <tr>
                    <td>평점: {this.props.movie.score}</td>
                </tr>
                <tr>
                    <td>장르: {this.props.movie.genre}</td>
                </tr>
                <tr>
                    <td colSpan={"2"}>
                        {this.props.movie.story}
                    </td>
                </tr>
            </table>
        )
    }
}

export default App4;

/*
[참고] JavaScript 자료형과 Jav의 자료형 비교 ★★★
- JavaScript에서의 [] ==> Java에서의 List (Array) ★★★ ==> 이번 예시에서는 movie
- JavaScript에서의 {} ==> Java에서의 VO (Object) ★★★ ==> 이번 예시에서는 m
 */

/*
[참고] JavaScript에서의 배열
["aaa",10,{name:"",sex:""}]
- JavaScript에서는 배열에 이런 식으로 데이터형 다르게 들어올 수 있다.
- Java에서는 Object[] obj={"",10,20,10.6} 이렇게 Object로는 만들 수 있기는 하지만 잘 쓰이지 않음.
  ==> Java에서는 Generics 같이 데이터형 통일된 걸 좋아함. 왜냐면 반복문을 한다고 생각해봐.
       ["aaa","bbb",10] 이런 Object를 반복문 돌린다면 index가 2일때는 String으로 변환시켜서 처리해주던가 해야함...
              ==> 형변환하고 이러는거 너무 귀찮아 ㅠ_ㅠ 그래서 Object[] 잘 안 쓰임.
 */

/*    <for => forEach,map>
        const bbb=['aaa','bbb','ccc'];
        bbb.map((data)=>{  // 배열 데이터를 하나씩 갖고와라
            // 첫바퀴 돌 땐 'aaa' 가져오고, 두번째 바퀴 돌땐 'bbb' 가져오고, 세번째 바퀴돌 땐 'ccc' 데이터 가져옴.
        })

        const movie=[{no:1,name:'해리포터1'},{no:2,name:'라스트위치헌터'},{no:3,name:'나니아 연대기'}]
        movie.map((data)=>{ // 배열 데이터를 하나씩 갖고와라
            // 첫바퀴 돌 땐 {no:1,name:'해리포터1'} 가져오고, 두번째 바퀴 돌땐 {no:2,name:'라스트위치헌터'} 가져오고, 세번째 바퀴돌 땐 {no:3,name:'나니아 연대기'}] 데이터 가져옴.
        })
*/