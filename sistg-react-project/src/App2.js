import React,{Component,Fragment} from "react"; /*React의 시작점*/
// {Component, Framgnet} <== 위에서 얘네 해주지 않으면
// class App2 extends Component 라고 쓸 수 없고 class App2 extends React.Component 라고 써야 한다.
// 마찬가지로, <Fragment> 라고 쓸 수 없고 <React.Fragment>라고 써야한다.
// <Fragment>는 실제로는 HTML 태그를 생성하지 않지만, render에서 마치 최상위 태그처럼 작동할 수 있다.
// ===> reder에 최상위태그로 <div> 주면 css 깨질 때 많이 사용함.

// ${}, {} ==> (주로) 변수 출력
// ${"Hello"} ==> text도 출력 가능

// return은 반드시 하나의 가장 큰 <div> </div>가 있어야함
// ex) return(<div></div> <div></div>); <== X
// ex) return (<div> <div></div> <div></div> </div>); <== O
// 만약, <div></div> 주기 싫으면, <React.Fragment></React.Fragment> 또는 <Fragment></Fragment> 쓸 수 있다.

class App2 extends Component{
  // React 시작
  render() {
    return ( // return 뒤의 여는 괄호 '('는 return 바로 뒤 (같은 줄)에 와야 한다. 다음 줄에 오면 오류남. (문법)
        // return 안에서 조건문 등 쓸 수 X
        // return 안에서 쓸 수 있는 제어문은 두개뿐★★★: 1) 삼항연산자 2) map ★★★
        /*<Fragment>
          {/!* Fragment는 임시 root를 만드는 태그명 *!/}
          <div className={"row"}>
            <h1 className={"text-center"}>React 연습</h1>
          </div>
          <div className={"row"}>
            <h1 className={"text-center"}>React 연습</h1>
          </div>
        </Fragment>*/

        /* [방법1] JSX: 결과는 아래와 똑같지만 이 방법이 훨씬 더 편리하다. */
        /*<ul>
            <li>Java1</li>
            <li>Java2</li>
            <li>Java3</li>
        </ul>*/
        /* [방법2] 원시코드 */
        React.createElement('ul',null,
           React.createElement('li',null,'Java1'),
           React.createElement('li',null,'Java2'),
           React.createElement('li',null,'Java3')
        ) // 가상 메모리에 올라감
    );
  }
}
export default App2;

/*
* <React>
* - 화면 UI (HTML) ==> render()
*   ============= JSX(JavaScript+XML) ==> ES6
*   화면UI ==> class 기반, function 기반 ==> function 기반이 보통 더 선호된다.
*   function 기반: 지역변수들 ==> 값 넘기기가 힘듦. ==> Hooks 공부해야함
*
* <React 공부해야할 것들>
*   1. JSX, 가상DOM
*   2. class, function
*   3. Hooks
*   4. Redux
*   5. Mobx, Saga
*
*   React           Redux          Mobx(Saga)
*   ====            =====          =========
*   JSP             MVC            Spring
*   (Model 1방식)
*/

/*
    <XML 문법>
    - 클래스명, 함수명 ==> class App function App2 ==> App2()
                        =========  ============
                        <App />    <App2 />
    - 함수 호출 시, 반드시 <App /> 이런 식으로 XML 형식으로 호출해야 해당 class 안의 모든 함수가 한 번에 호출된다.
      ==> HTML 태그와 사용자 정의 태그를 구분해야.
          ========   ==============
          소문자      첫 글자만 대문자 ===> React에서 class 이름 첫 글자 대문자로 만든다.
                     ex) <Fragment>

    <ul>
        <li>Java1</li>
        <li>Java2</li>
        <li>Java3</li>
    </ul>

    ==>
    render()
    {
        return(
            <ul>
                <li>Java1</li>
                <li>Java2</li>
                <li>Java3</li>
            </ul>
        );
    }

    ReactDOM.render();
    ===> XML을 HTML로 바꿈
    ===> React.createElement('ul',null,
            React.createElement('li',null,'Java1'),
            React.createElement('li',null,'Java2'),
            React.createElement('li',null,'Java3')
         )
    ===> 가상 메모리에 올라감
 */








