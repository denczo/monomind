import { useEffect, useState, useRef } from 'react';
import useMousePos from '../../../utils/MousePosHook';
import Cursor from '../cursor/Cursor';
import { setFreqOsc, setFreqFilter, noteRelease, notePress, initValues } from '../../../utils/Audio.js'
import './Touchpad.css';
import { useGlobalContext } from '../../../utils/GlobalContext';
import AudioEngine from '../../../utils/AudioEngine/AudioEngine.tsx';

const Touchpad = ({ width, height, wf }) => {

    const audioEngine = AudioEngine.getInstance();
    const mousePos = useMousePos();
    const padRef = useRef();
    const [x, setX] = useState(padRef.current?.offsetLeft);
    const [y, setY] = useState(padRef.current?.offsetTop);
    const { attack, decay, sustain, release } = useGlobalContext();

    const getPos = () => {
        const x = padRef.current.offsetLeft;
        const y = padRef.current.offsetTop;
        setX(x);
        setY(y);
    }

    const mouseInside = () => {
        if ((x + width >= mousePos.x && mousePos.x >= x) && (y + height >= mousePos.y && mousePos.y >= y)) {
            return true;
        } else {
            return false;
        }
    }

    // TODO: better variable names!
    const getConvertedScale = (scale, x, mousPos, length) => {
        return scale / length * (mousPos - x);
    }

    const updateFreqScale = () => {
        const scaledFreq = getConvertedScale(300, x, mousePos.x, width)
        const scaledFilter = getConvertedScale(1500, y, mousePos.y, height)
        setFreqOsc(scaledFreq);
        setFreqFilter(scaledFilter);
    }

    const playNote = () => {
        const scaledFreq = getConvertedScale(300, x, mousePos.x, width)
        const scaledFilter = getConvertedScale(600, y, mousePos.y, height)
        initValues(scaledFreq, scaledFilter);
        notePress(wf, attack, decay, sustain);
    }

    const updateAudioParam = () => {
        if (mouseInside()) {
            updateFreqScale();
        } else {
            noteRelease(release);
        }
    }

    useEffect(() => {
        getPos();
        updateAudioParam();
        window.addEventListener("resize", getPos);
        return () => {
            window.removeEventListener("resize", getPos);
        };
    }, [])

    return (
        <div className='Touchpad-border'>
            <div className='Touchpad' onMouseDown={() => audioEngine.playNote(0, 2, 0.4)} onMouseUp={() => noteRelease(release)} ref={padRef}>
                {mouseInside() ? <Cursor /> : <></>}
                {updateAudioParam()}
                <div className="LineX"></div>
                <div className="LineY"></div>
            </div>
        </div>
    );
}

export default Touchpad;
