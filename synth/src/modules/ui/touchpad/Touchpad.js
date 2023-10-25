import { useEffect, useState, useRef } from 'react';
import useMousePos from '../../../utils/MousePosHook';
import Cursor from '../cursor/Cursor';
import { setFreqOsc, setFreqFilter, noteRelease, notePress } from '../../../utils/Audio.js'
import './Touchpad.css';

const Touchpad = ({width, height, wf}) => {

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
        <div className ='Touchpad-border'>
            <div className='Touchpad' onMouseDown={() => notePress(wf)} onMouseUp={() => noteRelease()} onMouseOut={() => console.log("HAKUNA MATATA 2")} onMouseLeave={() => console.log("HAKUNA MATATA")} ref={padRef}>
                {mousePos.x >= x && mousePos.y >= y && mousePos.x < x+width && mousePos.y < y+height? 
                <Cursor />
                :
                <></>
                }
                {setFreqOsc(mousePos.y, wf)}
                {setFreqFilter(mousePos.x)}
                <div className="LineX"></div>
                <div className="LineY"></div>
            </div>
        </div>
    );
}

export default Touchpad;
