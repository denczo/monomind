import React from "react";
import './Key.css';

const Key = ({ type, isActive, onClick }) => {

    return (<div className={type+(isActive? " active" : "")}  onClick={onClick}></div>);
}

export default Key;
