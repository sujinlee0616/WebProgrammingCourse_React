import React,{useState, useEffect} from "react";
import axios from 'axios';

export default function Chef(props) {
    const [chef,setChef]=useState([]); // ==> 배열로 받아야
    const [page,setPage]=useState(1);
    const [total,setTotal]=useState(0);

    // [Chef 데이터 가져옴]
    useEffect(()=>{
        axios.get('http://localhost:3355/chef_data',{
            params:{
                page:page
            }
        }).then((res)=>{
            setChef(res.data)
        })
    },[chef])

    // [Total Page 데이터 가져옴]
    useEffect(()=>{
        axios.get('http://localhost:3355/chef_total').then((result)=>{
            setTotal(result.data.total)
        })
    },[total])

    // [이벤트 처리]
    // 1. 이전 버튼
    const onPrev=()=>{
        setPage(page>1?page-1:page)
        axios.get('http://localhost:3355/chef_data',{
            params:{
                page:page // http://localhost:3355/recipe_data?page='페이지변수값' 이렇게 됨
            }
        }).then((result)=>{
            setChef(result.data);
        })
    }
    // 2. 다음 버튼
    const onNext=()=>{
        setPage(page<total?page+1:page)
        axios.get('http://localhost:3355/chef_data',{
            params:{
                page:page // http://localhost:3355/recipe_data?page='페이지변수값' 이렇게 됨
            }
        }).then((result)=>{
            setChef(result.data);
        })
    }

    // render()
    const html=chef.map((m)=>
        <table className={"table"}>
            <tbody>
                <tr>
                    <td width={"30%"} rowSpan={"2"} className={"text-center"}>
                        <img src={m.poster} width={"50"} height={"60"} className={"img-circle"}/>
                    </td>
                    <td colSpan={"4"}><h3 style={{"color":"orange"}}>{m.chef}</h3></td>
                </tr>
                <tr>
                    <td className={"text-center"}>
                        <img src={"http://localhost:3000/images/1.png"}/>{m.mem_cont1}
                    </td>
                    <td className={"text-center"}>
                        <img src={"http://localhost:3000/images/2.png"}/>{m.mem_cont3}
                    </td>
                    <td className={"text-center"}>
                        <img src={"http://localhost:3000/images/3.png"}/>{m.mem_cont7}
                    </td>
                    <td className={"text-center"}>
                        <img src={"http://localhost:3000/images/4.png"}/>{m.mem_cont2}
                    </td>
                </tr>
            </tbody>
        </table>
    )

    return(
        <div className={"row"} style={{"margin":"0px auto","width":"900px"}}>
            <h2 className={"text-center"}>셰프 목록</h2>
            <table className={"table"}>
                <tbody>
                    <tr>
                        <td>
                            {html}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={"row"}>
                <button className={"btn btn-lg btn-primary"} onClick={onPrev}>이전</button>
                {page} page / {total} pages
                <button className={"btn btn-lg btn-danger"} onClick={onNext}>다음</button>
            </div>
        </div>

    )
}


