const express=require("express")
// 간단한 서버를 제작
const request=require("request")
// 다른 사이트 서버를 연결해서 데이터 읽기
const app=express();
// 서버 생성
const port=3355;
// port => 0~65535 (0~1023사용중)
// port 충돌 방지

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
// 서버 대기중
app.listen(port,()=>{
    console.log("Server Start...","http://localhost:3355")
})

app.get("/",(request,response)=>{
    response.send("Hello Node Server!!")
})
// mongodb 연결
const Client=require("mongodb").MongoClient
/*
    몽고디비 => NoSQL
    find() => SELECT * FROM movie
    find({mno:1}) SELECT * FROM movie WHERE mno=1
 */

/* [영화 목록] */
app.get("/movie_data",(request,response)=>{
    // url
    var page=request.query.page;
    var type=request.query.type;
    var rowSize=12;
    var skip=(page*rowSize)-rowSize;
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection("movie").find({cateno:Number(type)}).skip(skip).limit(rowSize).
        toArray(function(err,docs){
            response.json(docs);
            console.log(docs);
            client.close();
        })
    })
})

/* [영화목록]-총 페이지 */
app.get("/movie_total",(request,response)=>{
    var cateno=request.query.cateno;
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        // SELECT CEIL(COUNT(*)/12.0) FROM movie WHERE cateno=1
        // 14/12 => 1...  => 2
        db.collection("movie").find({cateno: Number(cateno)}).count(function (err,count) {
            response.json({total:Math.ceil(count/12.0)})
            client.close()
            return count;
        })
    })
})

/* [영화 상세페이지] */
app.get("/movie_detail",(request,response)=>{
    var no=request.query.no;
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection("movie").find({no:Number(no)}).
        toArray(function(err,docs){
            // 데이터가 [{}] 이렇게 넘어감
            response.json(docs);
            console.log(docs);
            client.close();
        })
    })
})

/* [영화 뉴스] */
app.get("/movie_news",(request,response)=>{
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection("news").find({}).  // 테이블명: news
        toArray(function(err,docs){
            // 데이터가 [{}] 이렇게 넘어감
            response.json(docs);
            console.log(docs);
            client.close();
        })
    })
})

/* [영화 인기 뉴스] */
app.get("/movie_news_pop",(request,response)=>{
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection("news_pop").find({}).  // 테이블명: news
            toArray(function(err,docs){
                // 데이터가 [{}] 이렇게 넘어감
                response.json(docs);
                console.log(docs);
                client.close();
            })
    })
})

// /movie_home?no=1&data=1
// req.query.data
app.get("/movie_home",(req,res)=>{
    var no=req.query.no;// request.getParameter("no");

    var site="";
    if(no==1)
    {
        site="searchMainDailyBoxOffice.do"
    }
    else if(no==2)
    {
        site="searchMainRealTicket.do"
    }
    else if(no==3)
    {
        site="searchMainDailySeatTicket.do"
    }
    else if(no==4)
    {
        site="searchMainOnlineDailyBoxOffice.do"
    }
    var url="http://www.kobis.or.kr/kobis/business/main/"+site;

    request({url:url},function (err,request,json) {
        console.log(json);
        res.json(JSON.parse(json));
    })
})


