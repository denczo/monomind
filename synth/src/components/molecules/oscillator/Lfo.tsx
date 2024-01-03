import React, { useEffect } from 'react';
import Slider from '../../atoms/slider/Slider.tsx';
import { AudioEngine } from '../../../audio/AudioEngine.tsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import WfSelector from '../wfselector/WfSelector.tsx';
import { OscId } from '../../../types/audio.d.tsx';
import "./Osc.css"

const Lfo = () => {
    const { bpm, setBpm, freqLp, setFreqLp, gain, setGain } = useGlobalContext();

    useEffect(() => {
        // AudioEngine.getInstance().setFreqLp(freqLp);
        // AudioEngine.getInstance().setGain(gain);
    }, [bpm, freqLp, gain])

    return (
        <div className="Osc">
            <WfSelector oscId={OscId.LFO}/>
            <Slider name={"Freq "} value={gain} updateValue={(e) => setGain(parseFloat(e.target.value))} />
            <Slider name={"Gain "} value={gain} updateValue={(e) => setGain(parseFloat(e.target.value))} />
        </div>
    );
}

export default Lfo;