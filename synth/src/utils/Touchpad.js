import { useEffect, useState, useRef } from 'react';
import useMousePos from './MousePosHook';
import Cursor from './Cursor';
import myOscillator from '../Audio.js'

import './Touchpad.css';

const Touchpad = ({width, height}) => {

    const mousePos = useMousePos();
    const padRef = useRef();
    const [x, setX] = useState();
    const [y, setY] = useState();

    const getPos = () => {
        const x = padRef.current.offsetLeft;
        const y = padRef.current.offsetTop;
        setX(x);
        setY(y);
    }

    useEffect(() => {
        getPos();
    }, [])

    return (
        <div className='Touchpad' onMouseDown={() => myOscillator.start()} onMouseUp={() => myOscillator.stop()} ref={padRef}>
            {mousePos.x >= x && mousePos.y >= y && mousePos.x < x+width && mousePos.y < y+height? 
            <Cursor />
            :
            <></>
            }
            {myOscillator.frequency.value = mousePos.y}
        </div>
    );
}

export default Touchpad;
