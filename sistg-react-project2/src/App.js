import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Recipe from './components/Recipe'
import Chef from './components/Chef'
import RecipeRecommend from './components/RecipeRecommend'
import RecipeNews from './components/RecipeNews'
import RecipeDetail from './components/RecipeDetail'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header/>
      <div className={"container-fluid"}>
          <div className={"jumbotron"}>
            {/* 여기가 include 되는 부분임 */}
            {/* - include되는 부분을 관리하는 애 : Router */}
            {/* - Route: 화면 */}
            {/* - Switch: 변경해주는 애 */}
            <Switch>
              <Route exact path={"/"} component={Home}/>
              <Route path={"/recipe"} component={Recipe}/>
              <Route path={"/chef"} component={Chef}/>
              <Route path={"/recommend"} component={RecipeRecommend}/>
              <Route path={"/news"} component={RecipeNews}/>
              <Route path={"/detail/:no"} component={RecipeDetail}/>
              {/* <Route ★★path={"/주소/:변수명"}★★ component={컴포넌트명}/> */}
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
