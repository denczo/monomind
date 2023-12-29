import React, { useEffect } from 'react';
import './Waveform.css';
import { useGlobalContext } from '../../utils/GlobalContext.tsx'
import AudioEngine from '../../utils/AudioEngine/AudioEngine.tsx';


const Waveform = () => {

    const {waveform, setWaveform} = useGlobalContext();
    const audioEngine = AudioEngine.getInstance();

    useEffect(() => {
        audioEngine.setWaveform(waveform);
    }, [waveform]);

    return (
        <div className="Waveform">
            <input type="radio" name="waveform" value="sine" id="sine" checked={waveform === "sine"} onChange={(e) => setWaveform(e.target.value)} />
            <label htmlFor="regular">Sine</label>

            <input type="radio" name="waveform" value="triangle" id="triangle" checked={waveform === "triangle"} onChange={(e) => setWaveform(e.target.value)}/>
            <label htmlFor="medium">Triangle</label>

            <input type="radio" name="waveform" value="sawtooth" id="saw" checked={waveform === "sawtooth"} onChange={(e) => setWaveform(e.target.value)}/>
            <label htmlFor="large">Saw</label>

            <input type="radio" name="waveform" value="square" id="square" checked={waveform === "square"} onChange={(e) => setWaveform(e.target.value)}/>
            <label htmlFor="large">Square</label>
        </div>
    );
}

export default Waveform;