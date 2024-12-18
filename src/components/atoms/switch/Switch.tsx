import React from 'react';
import './Switch.css';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';

const Switch = () => {

    const { adsrParams } = useGlobalContext();
    const { setMode, mode } = adsrParams;

    const handleCheck = () => {
        setMode(!mode);
    }

    return (<div id="switchcontainer">
            <div>Gain</div>
            <label className="switch">
                <input type="checkbox" checked={!!mode} onChange={handleCheck}/>
                <span className="slider round"></span>
            </label>
        <div>Filter</div>

    </div>);
}

export default Switch;