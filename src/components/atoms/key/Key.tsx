import React from "react";
import './Key.css';

const Key = ({ type, isActive, onMouseDown, onMouseUp }) => {
    
    return (<div className={type+(isActive? " active" : "")}  onMouseDown={onMouseDown} onMouseUp={onMouseUp}></div>);
}

export default Key;