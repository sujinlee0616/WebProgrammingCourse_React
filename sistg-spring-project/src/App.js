import React,{useEffect,useState} from 'react';
import axios from 'axios';

function App() {
  const [food,setFood]=useState([]);
  /* const [변수,set메소드] = useState([])  */
  useEffect(()=>{
    axios.get('http://localhost:8079/web/category.do').then((result)=>{
      setFood(result.data)
    })
  },[])
  /*useEffect(()=>{
    axios.get('http://xxx.xxx.xxx.xxx:8079/web/category.do').then((result)=>{
      setFood(result.data)
    })
  },[])*/
  /* Spring과 연결하기 위해 axios로 Spring에서 제공하는 데이터 갖고왔음.
   - axios.get('내컴퓨터IP:Tomcat포트번호/web/category.do')
   - 'localhost:8079/web/category.do' 해도 데이터를 갖고오긴함
   - Spring에서 web/category.do에다가 JSON 형태로 데이터 뿌려놨음 */

  const html=food.map((m,key)=>
      <li key={key}>{m.title}-{m.subject}</li>
  )

  return (
    <ul>
      {html}
    </ul>
  );
}

export default App;

/*
   jQuery에서 아래의 [방법1]과 [방법2]는 동일한 코딩.
   [방법1]
   $('#btn').click(function(){ ... });
   [방법2]
   function a(){}
   $('#btn').click(a())

   마찬가지로, 아래의 [방법1]과 [방법2]도 동일한 코딩임. 그냥 ES6 Arrow Function이라 어려워보일 뿐.
   [방법1]
   useEffect(()=>{})
   [방법2]
   const a=()=>{}
   useEffect(a())
 */
