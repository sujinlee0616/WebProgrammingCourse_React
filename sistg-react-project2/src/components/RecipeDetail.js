import React,{useState,useEffect,useCallback} from "react";

function RecipeDetail(props) {
    return(
        <h2 className={"text-center"}>레시피 상세보기: {props.match.params.no}</h2>
    )
}

export default RecipeDetail;