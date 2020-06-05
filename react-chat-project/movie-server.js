const express=require('express')
const app=express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
/*
       bind() ===> bind(post,ip) ==> 개통
       listen() => 대기상태
       accept() => 연결이 되면 ~~
 */
app.listen(3355,()=>{
    console.log("Server Start...","http://localhost:3355")
})

// [MongoDB 연결]
const Client=require("mongodb").MongoClient

app.get('/movie',(req,res)=>{
    var url="mongodb://211.238.142.181:27017";
    // 연결
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb")
        db.collection("movie").find({cateno:1}) // cateno=1: 현재 상영영화
            .toArray((err,docs)=>{
                res.json(docs)
                client.close()
            })
    })
})