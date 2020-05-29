import React, {useEffect, useState} from "react";
import axios from "axios";

export default function RecipeNews(props) {
    const [news,setNews]=useState([]);
    const [fd,setFd]=useState('레시피');

    // [데이터] 네이버 뉴스 데이터 불러옴
    useEffect(()=>{
        axios.get('http://localhost:3355/recipe_news',{
            params:{
                fd:fd
            }
        }).then((result)=>{
            setNews(result.data)
            console.log(result.data)
        })
    },[])
    // deps: 사용하지 않으면 렌더링 할 때마다 호출 ==> 무한루프 돈다 ㅠ_ㅠ

    // [이벤트]
    // 1. input에 onChange 될떄마다 입력된 검색어를 fd에 저장하고
    const onDataChange=(e)=>{
        setFd(e.target.value)
    }
    // 2. '검색' 버튼 클릭 시 검색어 날린다
    const onBtnClick=(e)=>{
        axios.get('http://localhost:3355/recipe_news',{
            params:{
                fd:fd
            }
        }).then((result)=>{
            setNews(result.data)
            console.log(result.data)
        })
    }


    // render() - 아래 return에 불러다 넣을 내용
    const html=news.map((m)=>
        <table className={"table"}>
            <tr>
                <td><b><a href={m.link} target={"_blank"}>{m.title}</a></b></td>
            </tr>
            <tr>
                <td>{m.description}</td>
            </tr>
            <tr>
                <td className={"text-right"}>
                    {m.author}
                </td>
            </tr>
        </table>
    )

    // [HTML 출력]
    return(
        <React.Fragment>
            <div className={"row"} style={{"margin":"0px auto 20px auto","width":"900px"}}>
                <h2 className={"text-center"}>네이버 뉴스 검색</h2>
                <input type={"text"} className={"input-sm"} size={"20"} value={fd} onChange={onDataChange} />
                <button className={"btn btn-sm btn-danger"} onClick={onBtnClick}>검색</button>
            </div>
            <div className={"row"} style={{"margin":"0px auto","width":"900px"}}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            {html}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}