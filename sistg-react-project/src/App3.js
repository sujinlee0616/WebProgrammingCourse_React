import React,{Component,Fragment} from "react";

// ↓ 이렇게 class에다가 바로 export default 해도 됨
export default class App3 extends Component{
    constructor(props) {
        super(props);
        console.log("constructor(props) Call..."); // System.out.println()
        this.state={
            name:''
        }

        // 이벤트 등록
        this.nameChange=this.nameChange.bind(this);
    }

    nameChange(e){
        console.log("nameChange Call...\"");
        this.setState({name:e.target.value});
        // this.state.name=e.target.value;  // 이렇게 하면 state 변수에 값을 채울 수는 있지만 화면 변경이 되지 않음!!!
        // 화면 변경하려면 setState 써야 ★★★ ==> 그래야만 re-rendering됨

    }

    componentWillMount() {
        console.log("componentWillMount() Call...");
    }
    componentDidMount() {
        console.log("componentDidMount() Call...");
    }
    render() {
        console.log("render() Call...");
        return (
            <div>
                {/* [props 사용] */}
                {/* <h1>이름: {this.props.name}</h1>
                <h1>성별: {this.props.sex}</h1>
                <h1>나이: {this.props.age}</h1>*/}
                {/* 만약 Tomcat서버에서 데이터를 갖고 올거면, props로 받지 못함 ==> state로 값 받아야. */}

                {/* [state 사용] */}
                 이름:<input type={"text"} className={"input-sm"} size={"20"}
                        onChange={this.nameChange}
                    />
                <br/>
                <br/>
                입력한 이름:<h3 style={{"display":"inline-block"}}>{this.state.name}</h3>

                {/* [외부 HTML 복붙했을 떄] - JSX 문법 주의! empty tag 닫아주고, style은 {{"속성명":"속성값"}} 이렇게 줘야! */}
                {/*<div className="row">
                    <div className="col-md-4">
                        <div className="thumbnail">
                            <a href="/w3images/lights.jpg">
                                <img src="https://www.w3schools.com/bootstrap/img_chania.jpg" alt="Lights" style={{"width":"100%"}}/>
                                <div className="caption">
                                    <p>Lorem ipsum...</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>*/}

            </div>
        )
    }
}


/*
    <React 생명주기>
    - ★★★★★ constructor ==> componentWillMount ==> render ==> componentDidMount ==> 이벤트 발생 (페이지 클릭)
      ==> setState() ==> render() ★★★★★
          ==========
          데이터 변경 시 화면에 출력 ==> re-rendering
    - [참고] https://velopert.com/3631

    1. constructor (생성자 함수)
      - Java로 치면 App3(){} 이런거.
      - 없는 경우에는 자동 생성되므로 작성하지 않아도 된다.
      1) 멤버변수를 선언
         ex) this.state
      2) 이벤트 등록

    2. componentWillMount
      - Mount가 되기 전 수행하는 함수
      - Mount: (가상)메모리에 올리는 것. ==> render() 수행하기 전에 실행됨

    3. render
      - 데이터를 받아서 화면에 출력.(HTML)
      - return 안에는 순수하게 HTML만 들어가야함 ==> console.log같은 js코드 넣지X
      - 화면을 변경하려면 다시 render() 해야 (re-rendering) ==> state를 변경한다. (setState())
        ==> 변경될 변수는 state에 잡아야 한다.
        ex) this.state={
                 page:1,
                 data:[],
                 detail:{}
            }
      - 화면에 출력하기 위해서 JSX(JavaScript+XML)을 주로 이용한다.
        참고) JSX: https://ko.reactjs.org/docs/introducing-jsx.html
      - ML(Makrup Language)들은...
        1) 여는 태그 ex) <table>
        2) 닫는 태그 ex) </table>
        3) 단독 태그(empty tag) ex) <input>
          - React에서는 empty tag들 반드시 닫아야함!!! ★★★
            ex) <input> (X)   vs <input/> (O)

    4. componentDidMount
      - window.onload, $(function(){}) 에 해당함
      - 다른 프레임워크(ex. jQuery, Angular.js, TypeScript 등)과 연결할 때 사용

 */

/* <Props, state>
    1. props
     - ★부모 컴포넌트가 자식 컴포넌트에게 주는 값.★
     - 변경O: 자식 컴포넌트에서는 props 를 받아오기만 하고, 받아온 props 를 직접 수정/변경할 수 는 없다.
     - ex) <App name="홍길동">
       : Java에서의 new App("홍길동"); 과 같다.
       : 값을 바꿀 수 없다.
     - ex) index.js에서 <App3 name={"홍길동"} sex={"남자"} age={"30"} /> 해서 보낸 name,sex,age 같은 속성들은 props가 받는다.
    2. state
     - 컴포넌트 내부에서 선언.
     - 변경X: 내부에서 값을 변경 할 수 있다.
     - ex) this.state={
                page:1,
                data:[],
                detail:{}
            }
 */

/*  <JSX>
   1. 반드시 전체를 포함하는 최상위 태그 하나가 필요하다.
      ex) 괜찮은 예시
          render() {
              return (
                  <div>Hello, world! :D</div>
              )
          }
      ex) 안 되는 예시 <== 최상위 태그가 두 개
          render() {
              return (
                  <div>Hello,</div>
                  <div>world! :D</div>
              )
          }
    2. HTML 태그는 반드시 소문자로, 사용자 태그는 대문자로 시작해야 한다.
       ex) <div> (O)
           <Div> (X) <== 사용자 태그로 인식함
           <DIV> (X) <== 사용자 태그로 인식함
    3. 속성값을 입력할 때는 반드시 "" (큰따옴표)를 사용해야 한다.
       ex) <input type="text"> (O)
           <input type=text> (X)
    4. 클래스는 'class'가 아니라 'className'이라고 써야 한다.
       ex) React 코드에서는 <input className="">이렇게 써야.
    5. 내부 스타일(inline style)을 줄 때는 style={{"속성명":"속성값"}} 형식으로 써야 한다.
       ex) style={{"width":"200px","height":"150px"}}
       - 속성값 뒤에 ';' 주면 안 됨!!!
       ex) <h3 style={{"display":"inline-block"}}>{this.state.name}</h3>   (O)
           <h3 style={{"display":"inline-block;"}}>{this.state.name}</h3>   (X) 스타일 안 먹음
    6. 속성에서 '-'로 연결되는 속성명은 '-'를 생략하고, '-' 바로 뒤의 단어를 대문자로 처리한다.
       ex) style={{"font-size":"10pt"}} (X)
           style={{"fontSize":"10pt"}} (O)
    7. 여는 태그와 닫는 태그가 다르면 오류난다. (HTML에서는 그냥 넘기지만, React /XML에서는 오류냄)
       ex) <a><b><c></a></b></c> (X) Error남.
           <a><b><c></c></b></a> (O)
    8. 일부 속성의 명칭이 살짝 다르다.
       ex) rowspan, colspan ==> rowSpan, colSpan
    9. 이벤트 처리 시, 이벤트 속성에서 대소문자 구별 반드시 해줘야 한다.
       [JavaScript]       [React]
       onclick       ==>   onClick
       onchange      ==>   onChange
       onkey         ==>   onKey
       onmouseover   ==>   onMouseOVer
    10. return 안에서 주석 걸려면 {/* 주석 * /} 이렇게 써야 한다.


 */




