import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Home from './components/Home';
import POPFoodHouse from './components/POPFoodHouse';
import RecommendFoodHouse from './components/RecommendFoodHouse';
import Recipe from './components/Recipe';
import FoodNews from './components/FoodNews';

// React에서의 App.js = Java에서의 main.java 라고 생각하면됨
function App() {
  return (
          <Router>
            <Header/>
            <Switch>
                <Route exact path={"/"} component={Home}/> {/* exact는 root에만 줘라 */}
                <Route path={"/pop"} component={POPFoodHouse}/>
                <Route path={"/recommend"} component={RecommendFoodHouse}/>
                <Route path={"/recipe"} component={Recipe}/>
                <Route path={"/news"} component={FoodNews}/>
            </Switch>
            <Footer/>
          </Router>
  );
}

export default App;
