const express=require("express")
const app=express();

// [http 서버 생성]
const server=require("http").createServer(app);
const port=7777;

server.listen(port,()=>{
    console.log("Chat Server Start...");
})

// [채팅 서버 생성]
// - 채팅 서버: webSocket 이용.
const socketio=require('socket.io');
const io=socketio.listen(server);
/*  위의 js 코드는 Java에서의 아래의 코딩과 같다.
    public class Server
    {
        ServerSocket ss;
        public Server()
        {
            ss=new ServerSocket(7777);
        }
        public void run()
        {
            Socket s=ss.accept();
        }
    }
 */


// [요청]
// - 클라이언트가 문자열을 입력했다면('chat_msg')
io.on('connection',(socket)=>{
    socket.on('chat_msg',(msg)=>{
        console.log(msg);
        io.emit('chat_msg',msg);  // 접속한 모든 유저에게 데이터를 전송하라
    })
})

/*  위의 js 코드는 Java에서의 아래의 코딩과 같다.
    public void run()
    {
        case LOGIN:
        {
        }
        case MAKEROOM:
        {
        }
    }
 */





