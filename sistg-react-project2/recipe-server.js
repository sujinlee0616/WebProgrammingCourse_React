const express=require("express")
const app=express();
const port=3355; // 내 맘대로 정하면 됨
/*  ★★★ 서버 ★★★
    - 채팅 서버 하나 node.js에서 돌리고
    - Spring에서 Tomcat 서버 돌리고
 */
// 여기선 Spring에서 할 수 있는 왠만한 것 다 됨

app.listen(port,()=>{
    console.log("Start Server....","http://localhost:3355")
})

app.get('/',(req,res)=>{
    res.send('Hello Node.js')
})

app.get('/recipe_data',(req,res)=>{
    res.send('Hello This is recipe data')
})










