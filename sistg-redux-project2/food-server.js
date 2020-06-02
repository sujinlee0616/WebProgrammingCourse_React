const express=require("express")
const app=express();

// ★★★ Terminal에서 서버 두 개 돌려야 ★★★
// 1. npm start
// 2. node food-server
//    ===> 브라우저에 http://localhost:3355/news?fd=홍대맛집 입력 ===> WebStorm의 콘솔에 데이터가 출력됨을 확인할 수 있다.
//    - 기존 서버 돌던거 중지하고 다시 서버 돌리고 싶으면 Terminal에서 Ctrl+C 하면 명령어 입력하는 칸 나옴.

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// [서버 돌린다]
app.listen(3355,()=>{
    console.log("Server Start....","http://localhost:3355")
})
/* 참고) 서버: bind() ==> listen() ==> accept()
    - bind() ==> bind(post,ip) ==> 전화로 따지면... '개통' 상태.
    - listen() ==> 전화로 따지면... '대기' 상태.
    - accept() ==> 전화로 따지면... '연결된 상태'.
 */

// [뉴스 가져오기]
// request라는 라이브러리를 가져와라 (import 처럼)
// 다른 사이트 서버를 연결해서 데이터 읽어올거임.
const request=require("request")
// XML을 JSON으로 변환하기 위해 xml2js 라이브러리 가져왔음
const xml2js=require('xml2js')

/*
    웹 => 사용자가 요청한 정보(request)를 모아서 전송, 응답정보(사용자의 IP,PORT)(response)
    ===> 시스템(web server)에서 처리해줌 : node 안에 이 값을 받아오는 프로그램이 만들어져 있다.
    ex) Spring: Tomcat에서 req,res 처리해줌
    ex) Node: express안에 req,res 처리해주는거 만들어져 있음
 */
app.get("/news",(req,res)=>{
    // 1. encodeURIComponent: 유저가 입력한 검색어 인코딩시킴
    // ex) 유저가 '영화'라고 입력 ==> 원래는 '/news?fd=영화' 이렇게 되겠지만 인코딩처리 시켜서 '/news?fd=%EC%98%81%ED%99%94' 이런식으로 보냄
    var fd=encodeURIComponent(req.query.fd)

    // 2. 네이버에 연결
    var url="http://newssearch.naver.com/search.naver?where=rss&query="+fd;

    // 3. XML to JSON Parser 생성: XML을 JSON으로 변환시켜서 출력해야니까..
    var parser=new xml2js.Parser({
        explicitArray:false
    })

    // 네이버 서버에 접근
    request({url:url},(err,request,xml)=>{
        // WebStorm의 Console에 XML 데이터가 출력됨
        //console.log(xml)

        // WebStorm의 Console에 JSON 데이터가 출력됨
        parser.parseString(xml,function (err,pJson) {
            // console.log(pJson)   // 전체 JSON
            console.log(pJson.rss.channel.item)  // JSON 중에서 우리가 필요한 데이터: item
        })
    })


})


