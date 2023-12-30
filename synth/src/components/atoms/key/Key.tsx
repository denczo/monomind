import React from "react";
import './Key.css';

const Key = ({ type, onClick }) => {

    return (<div className={type}  onClick={onClick}></div>);
}

export default Key;
