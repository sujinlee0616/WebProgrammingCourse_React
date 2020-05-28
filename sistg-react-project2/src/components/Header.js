import React from "react";
import {NavLink} from "react-router-dom";

export default function Header(props) {
    return(
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">슬기로운 자취생활</a>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/recipe"}>레시피</NavLink></li>
                    <li><NavLink to={"/chef"}>셰프</NavLink></li>
                    <li><NavLink to={"/recommend"}>추천</NavLink></li>
                    <li><NavLink to={"/news"}>뉴스</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}