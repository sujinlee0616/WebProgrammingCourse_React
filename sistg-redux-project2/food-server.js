const express=require('express')
const app=express();

// ★★★ Terminal에서 서버 두 개 돌려야 ★★★
// 1. npm start
// 2. node food-server
//    ===> 브라우저에 http://localhost:3355/news?fd=홍대맛집 입력 ===> WebStorm의 콘솔에 데이터가 출력됨을 확인할 수 있다.
//    - 기존 서버 돌던거 중지하고 다시 서버 돌리고 싶으면 Terminal에서 Ctrl+C 하면 명령어 입력하는 칸 나옴.


// [CORS 처리]
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


// [webpack]
const path=require('path')
// public 디렉터리의 내용을 자동으로 응답합니다. --- (※3)
app.use('/', express.static('./public'))
// 최상위 페이지에 접속하면 /public으로 리다이렉트합니다.
app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

// ============================== [네이버 뉴스 가져오기] ==============================
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
    // 1) fd 변수를 받아옴 + 한글이라서 인코딩 처리
    // encodeURIComponent: 유저가 입력한 검색어 인코딩시킴
    // ex) 유저가 '영화'라고 입력 ==> 원래는 '/news?fd=영화' 이렇게 되겠지만 인코딩처리 시켜서 '/news?fd=%EC%98%81%ED%99%94' 이런식으로 보냄
    var fd=encodeURIComponent(req.query.fd) 
    // 2) 네이버 뉴스 API에 연결
    var url="http://newssearch.naver.com/search.naver?where=rss&query="+fd;
    // 3) XML to JSON Parser 생성: XML을 JSON으로 변환시켜서 출력해야니까..
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
            res.json(pJson.rss.channel.item) // 데이터 전송
        })
    })
})


// ============================== [Recipe 데이터] ==============================
const Client=require("mongodb").MongoClient
app.get('/recipe',(req,res)=>{ // http://localhost:3355/recipe하면 데이터 주는거 볼 수 있다.
    var page=req.query.page; // Java 코딩으로 치면 request.getParameter("page") 임.
    var rowSize=9;
    var skip_data=rowSize*(page-1);
    var url="mongodb://211.238.142.181:27017"; // 선생님 컴터
    // 연결
    Client.connect(url,(err,client)=>{  // 클라이언트가 /recipe로 접근하면 요 정보 줘라.
        var db=client.db("mydb");
        db.collection("recipe").find({}).skip(skip_data).limit(rowSize)
            .toArray((err,docs)=>{
                res.json(docs);
                client.close();
            });
    })
})


// ============================== [메인 - 카테고리 출력] ==============================
app.get('/category',(req,res)=>{ // category는 딱 10개
    var url="mongodb://211.238.142.181:27017"; // 선생님 컴터
    // 연결
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection("category").find({})
            .toArray((err,docs)=>{
                res.json(docs);
                client.close();
            });
    })
})


// ============================== [카테고리 음식] - 메인 > 카테고리 클릭 > 음식점 목록 출력 ==============================
app.get('/cate_food',(req,res)=>{
    var cno=req.query.cno; // cno 변수를 받아옴 ★
    var url="mongodb://211.238.142.181:27017"; // 선생님 컴터
    // 연결
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection("food").find({cno:Number(cno)})
            .toArray((err,docs)=>{
                res.json(docs);
                console.log(docs);
                client.close();
            });
    })
})