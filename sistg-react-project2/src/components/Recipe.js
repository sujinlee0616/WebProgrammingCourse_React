import React,{useState,useEffect,useCallback} from "react";
import axios from 'axios';
import {NavLink} from "react-router-dom";
// useEffect: 데이터를 가지고 옴. (서버나 파일을 읽어온다.)
// useState: 저장. (읽어온 파일을 저장)

export default function Recipe(props) {
    const [recipe,setRecipe]=useState([]) // recipe-server.js에서 배열로 보냈으니까 배열로 받아야.
    const [page,setPage]=useState(1)
    const[total,setTotal]=useState(0)
    /*  위의 코딩은, 이전에 함수가 아니라 class로 React 짰을 때의 아래의 코딩과 같다.
        this.set{
            page:1,
            total:0
        }
     */

    // [Recipe 데이터 가져옴]
    useEffect(()=>{
        axios.get('http://localhost:3355/recipe_data',{
            params:{
                page:page // http://localhost:3355/recipe_data?page='페이지변수값' 이렇게 됨
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
        // 여기서 axios.get했으니까 recipe-server.js에서 app.get 해야함
        // 물론, axios.post도 있다.
    },[recipe])  // deps:[recipe]   <== recipe 데이터가 갱신될 때만 다시 수행하라
    /*  위의 useEffect 코딩은, 이전에 함수가 아니라 class로 React 짰을 때의 componentWillMount()와 같다. 데이터를 가지고 온다. */
    /*
        [참고] 함수 안에 함수를 만드는 것은 불가능
        ==> 함수로 React를 만들면(export default function Recipe(props){...}),
            class로 React 프로그램 만들 때와는 달리,
            React lifecyle 관련 함수들(componentWillMount(), componentDidMount()와 같은 함수를 쓸 수 없다.
            왜냐면 함수 안에 함수를 또 쓸 수 없으니까...
            ==> Hooks(useEffect 등)를 사용.
                - ★ useEffect를 이용하면 함수 안에 함수를 만들 수 있다. ★
        [참고] Java에서, class 안에 class는 가능. (inner class) - 우리 쓰레드 만들 때 썼었음.
        class A{ class B{} }
     */

    // [Total Page 데이터 가져옴]
    useEffect(()=>{
        axios.get('http://localhost:3355/total_data').then((result)=>{
            setTotal(result.data.total)
        })
    },[total]) // [total] : total 데이터가 바뀌었을 때만 다시 수행하라

    // [이벤트 처리]
    // 1. 이전 버튼
    const onPrev=()=>{
        setPage(page>1?page-1:page)
        axios.get('http://localhost:3355/recipe_data',{
            params:{
                page:page // http://localhost:3355/recipe_data?page='페이지변수값' 이렇게 됨
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    }
    /* useCallback 주석처리 */
    /*const onPrev=useCallback(()=>{
        setPage(page>1?page-1:page)
        axios.get('http://localhost:3355/recipe_data',{
            params:{
                page:page // http://localhost:3355/recipe_data?page='페이지변수값' 이렇게 됨
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    },[page]);*/
    // 2. 다음 버튼
    const onNext=()=>{
        setPage(page<total?page+1:page)
        axios.get('http://localhost:3355/recipe_data',{
            params:{
                page:page // http://localhost:3355/recipe_data?page='페이지변수값' 이렇게 됨
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    }
    /* useCallback 주석처리 */
    /*const onNext=useCallback(()=>{
        setPage(page<total?page+1:page)
        axios.get('http://localhost:3355/recipe_data',{
            params:{
                page:page // http://localhost:3355/recipe_data?page='페이지변수값' 이렇게 됨
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    },[page]);*/

    // render()
    const html=recipe.map((m)=>
        <div className="col-md-3">
            <div className="thumbnail">
                {/* ★상세 페이지로 랜딩시키기★ */}
                <NavLink to={"/detail/"+m.no}>
                    <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                </NavLink>
                <div className="caption">
                    <p style={{"font-size":"9pt"}}>{m.title}</p>
                    <sub style={{"color":"gray"}}></sub>
                </div>
            </div>
        </div>
    )

    return(
        <React.Fragment>
            <div className={"row"} style={{"margin":"0px auto 20px auto","width":"900px"}}>
                <h2 className={"text-center"}>레시피 목록</h2>
                {html}
            </div>
            <div className={"row"} style={{"margin":"0px auto 20px auto","width":"900px"}}>
                <button className={"btn btn-lg btn-primary"} onClick={onPrev}>이전</button>
                {page} page / {total} pages
                <button className={"btn btn-lg btn-danger"} onClick={onNext}>다음</button>
            </div>
        </React.Fragment>
    )
}