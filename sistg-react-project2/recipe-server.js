const express=require("express")
const app=express();
const port=3355; // 내 맘대로 정하면 됨
// ★★★★★★[MongoDB 연결]★★★★★★
// - WebStorm Terminal 하나는 요거 mongoDB 돌리고, (node recipe-server)
//   다른 Terminal 하나는 React 돌려야. (npm start)

/*  [서버 ]
    - 추후에 채팅 서버 하나 node.js에서 돌리고, Spring에서 Tomcat 서버 돌려서 채팅 만들거임.  */
// 여기선 Spring에서 할 수 있는 왠만한 것 다 됨
// 얘는 변경사항 있으면 다시 terminal에서

app.listen(port,()=>{
    console.log("Start Server....","http://localhost:3355")
})

// [CORS 해결]: port가 달라도 허용해주도록
// 참고) http://guswnsxodlf.github.io/enable-CORS-on-express
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/',(req,res)=>{
    res.send('Hello Node.js')
})

const MongoConnect=require("mongodb").MongoClient; // MongoDB 연결 객체 생성
/*  Java에서의 아래 코딩과 동일.
    @RequestMapping("/recipe_data")
    public String ...
 */

// [레시피 목록] MongoDB 연결, 데이터 가져오기
app.get('/recipe_data',(req,res)=>{
    // 페이지 받아오기
    var page=req.query.page; // Java에서의 String page=request.getParameter("page");
    // url이 '/recipe_data?page=1' 요런식으로 들어옴 ==> 'req.query.변수명'에서 변수명은 url 파라미터명과 일치해야함.
    var rowSize=12; // 한 페이지에 20개 출력
    var skip=(page)*(rowSize-1);
    var url="mongodb://211.238.142.181:27017" // 선생님이 선생님 컴에 만들어놓으신 MongoDB에 연결...
    // MongoDB와 연결 => 연결 객체 얻기
    // MongoClient MongoConnect=new MongoClient()
    /*                  Oracle          MongoDB
        database:         XE             mydb
                         table          collection
     */
    MongoConnect.connect(url,function (err,client) {
        var db=client.db('mydb'); // XE
        db.collection('recipe').find({}).skip(skip).limit(rowSize).toArray(function (err,docs) {
            res.json(docs);  // Java에서의 model.addAttribute("list",list);와 동일. JavaScript는 Java와 달리 ArrayList가 없으므로 배열로 보냄.
            // 근데, 배열 docs [{},{}]는 문자로 인식되므로 json(docs)해서 JSON으로 변환했다.
            client.close();
        })
        // find(): SELECT
        /* toArray
           - MongoDB는 배열이 아님 ==> toArray는 {} {} {} {} ... {} 이런 애들을 [{} {} {} {}] 이렇게 배열로 만들어 준다.
           - (Oracle에서 배열이 아니라서 ArrayList로 만드는 것과 유사.
           - docs=[{} {} {} {} ] 요렇게 된다. */
    })
})

// [레시피 목록] 총 페이지 구하기
app.get('/total_data',(req,res)=>{
    var url="mongodb://211.238.142.181:27017";
    MongoConnect.connect(url,(err,client)=>{
        var db=client.db('mydb');
        db.collection('recipe').find({}).count((err,count)=>{
            res.json({total:Math.ceil(count/12.0)})
            client.close()
            return count;
        })
    })
})

// [셰프 목록] 셰프 데이터 가져오기
app.get('/chef_data',(req,res)=>{
    var page=req.query.page;
    var rowSize=50;
    var skip=(page)*(rowSize-1);
    var url="mongodb://211.238.142.181:27017"

    MongoConnect.connect(url,function (err,client) {
        var db=client.db('mydb');

        db.collection('chef').find({}).skip(skip).limit(rowSize).toArray(function (err,docs) {
            res.json(docs);
            client.close();
        })
    })
})

// [셰프 목록] 총 페이지 구하기
app.get('/chef_total',(req,res)=>{
    var url="mongodb://211.238.142.181:27017";
    MongoConnect.connect(url,(err,client)=>{
        var db=client.db('mydb');
        db.collection('chef').find({}).count((err,count)=>{
            res.json({total:Math.ceil(count/50.0)})
            client.close()
            return count;
        })
    })
})

// xml2js: XML을 JSON으로 변경해주는 라이브러리.
const xml2js=require("xml2js")

// request: 다른 서버로 연결할 때 사용.
const request=require("request")

// [네이버 뉴스 크롤링]
app.get("/recipe_news",(req,res)=>{
    var query=encodeURIComponent(req.query.fd);
    var url="http://newssearch.naver.com/search.naver?where=rss&query="+query;
    var parser=new xml2js.Parser({
        explicitArray:false
    })
    request({url:url},(err,request,xml)=>{
        //console.log(xml); // 브라우저에서 'http://localhost:3355/recipe_news?fd=야구' 입력하고 엔터치면 WebStorm Terminal에 데이터 출력됨
        parser.parseString(xml,function(err,pJson){ //
            console.log(pJson.rss.channel.item);
            res.json(pJson.rss.channel.item);
        })
    })
})






