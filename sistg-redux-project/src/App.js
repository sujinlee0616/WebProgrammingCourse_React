import React from 'react';
import MovieReal2 from './components/MovieReal2'
import store from './store/store'
import {Provider} from "react-redux";
import MovieDetail2 from "./components/MovieDetail2";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import MovieNews from "./components/MovieNews";
import MovieNewsPop from "./components/MovieNewsPopular";

function App() {
  return (
    <Provider store={store}>
        <div className={"container"}>
            <Switch>
                <Route exact path={"/"} component={MovieReal2}/>
                <Route path={"/movie_detail/:no"} component={MovieDetail2}/>  {/* <== 값 보내는 방식 ':no' 이런식으로...  */}
                <Route path={"/movie_news"} component={MovieNews}></Route>
                <Route path={"/movie_news_pop"} component={MovieNewsPop}></Route>
            </Switch>
        </div>
    </Provider>
  );
}

/* store: 전역변수. ==> <Provider> 안에 소속된 모두는 (<MovieReal/> 등) 모두 다 store를 받는다. */

export default App;
