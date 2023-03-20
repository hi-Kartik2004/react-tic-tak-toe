import React from "react";

const Square = (props) =>{

    return(
        <div className="square" onClick = {props.onClick}>
            <h4>{props.value}</h4>
        </div>
    );
}

export default Square;