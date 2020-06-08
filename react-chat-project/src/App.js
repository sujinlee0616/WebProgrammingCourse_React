import React,{Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
import io from 'socket.io-client' // 소켓 클라이언트

// chat-server.js에서 만든 socket과 연결
const socket=io.connect('http://localhost:7777');


// =================================== class App ===================================
class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      movie:[],
      logs:[] // logs: 채팅문자열. 채팅 로그.
    }
  }
  componentDidMount() {
    axios.get("http://localhost:3355/movie").then((result)=>{
      this.setState({movie:result.data})
    })

    socket.on('chat_msg',(obj)=>{ // 서버가 보내준 obj를 받아서 (유저가 새로운 채팅을 입력하면)
      const log2=this.state.logs; // log2에 1) logs(기존에 있던 채팅대화)를 넣고
      log2.push(obj);  // log2에 2) 이번에 유저가 새로 입력한 채팅을 넣고
      this.setState({logs:log2}) // logs(이때까지의 채팅 대화 내역)에 log2('1)기존 대화'+'2)이번에 새로 입력한 채팅')을 넣는다.
    })

    $('div#chat').toggleClass('active');
    var $win = $(window);
    var top = $(window).scrollTop(); // 현재 스크롤바의위치값을 반환합니다.

    /*사용자 설정 값 시작*/
    var speed          = 1000;     // 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
    var easing         = 'linear'; // 따라다니는 방법 기본 두가지 linear, swing
    var $layer         = $('div#chat_container'); // 레이어셀렉팅
    var layerTopOffset = 0;   // 레이어 높이 상한선, 단위:px
    $layer.css('position', 'absolute');
    /*사용자 설정 값 끝*/

    // 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
    if (top > 0)
      $win.scrollTop(layerTopOffset+top);
    else
      $win.scrollTop(0);

    //스크롤이벤트가 발생하면
    $(window).scroll(function(){
      var yPosition = $win.scrollTop()+600;
      if (yPosition< 0)
      {
        yPosition = $win.scrollTop()+600;
      }
      $layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
    });
  }

  render() {
    // return 안에는 for문 들어갈 수 없음 ==> 반복문 하려면 return 밖에서 html 생성해서 그걸 호출해야함. ==> const html=... 해서 호출하자.
    const html=this.state.movie.map((m)=>
        <div className="col-md-4">
          <div className="thumbnail">
            <img src={m.poster} alt="Lights" style={{"width": "100%"}}/>
            <div className="caption">
              <p>{m.title}</p>
            </div>
          </div>
        </div>
    )
    // [HTML 출력]
    // return 안에는 for문 들어갈 수 없음 ==> 반복문 하려면 return 밖에서 html 생성해서 그걸 호출해야함.
    return (
        <React.Fragment>
          <div className={"row"}>
            {html}
          </div>
          <ChatMain logs={this.state.logs}/>
          {/* App에서 props를 받았는데 ChatMain에서 출력해야함 ==> ChatMain에 props 값 넘겨준다. */}
        </React.Fragment>
    )
  }
}

// =================================== class ChatMain ===================================
class ChatMain extends Component{
  render() {
    const html=this.props.logs.map((m)=> // App에서 넘겨준 props로 logs 데이터 받은거 사용.
        <div className={"message right"}>
          <div className={"message-text"}>
            {m.message}
          </div>
        </div>
    )
    return (
        <div id={"chat_container"}>
          <div id={"chat"} className={"active"}>
            <header><h1>Chat</h1></header>
            <section className={"content"}>
              <div className={"message_content"}>
                {html}
              </div>
            </section>
            <ChatForm/>
          </div>
        </div>
    );
  }
}

// =================================== class ChatForm ===================================
class ChatForm extends Component{
  constructor(props) {
    super(props);
    this.state={
      message:''
    }
  }
  messageChange(e)
  {
    this.setState({message:e.target.value})
  }
  send(e)
  {
    if (e.key == 'Enter') {
      e.preventDefault(); // 이벤트 동작 정지
      // 메시지 전송
      socket.emit('chat_msg',{  // 엔터 누르면 소켓에 'chat_msg' 전송 ==> chat-server.js에서 '아 얘가 채팅 보냈군!'하고 그에 맞게 동작함
        message:this.state.message
      })
      this.setState({message:''}) // 엔터 누르면 채팅창에 메시지 비운다.
    }
  }
  render(){
    return(
        <form action={""}>
          <input id={"input_chat"} type={"text"}
            onChange={this.messageChange.bind(this)}
            onKeyPress={this.send.bind(this)}
                 value={this.state.message}
          />
        </form>
    )
  }
}

export default App;


/*
    class 기반 컴포넌트: Hooks를 사용할 수 '없다'
                       =====
                       function 기반에서, class 기반에서 사용하는 React 생명주기(lifecycle) 함수를 사용할 수 있게 만든다.

    class: props, state
           ==> 생명주기 함수
               1. constructor
               2. componentWillMount()
               3. render()
               4. componentDidMount() ===> 메모리에 HTML을 저장 (메모리에 '올린다' ==> 'Mount')
               5. setState()해서 데이터 변경
               6. componentWillUpdate()
               7. render()
               8. componentDidUpdate()

    function: props, state(X) ==> state(데이터)를 관리하는 프로그램
              - 속도가 더 빠르다.
             ==> function은 모든 함수 ==> render()
                 function App(): 'render()'라고 생각하면 됨. → 화면 UI (HTML) 입력.
                 'useState'를 써서 state를 사용할 수 있게 만듦.
                 => const [page,setPage]=useState(1);
                 ==> setPage(2)하면(setState) 자동으로 render()가 호출됨

 */