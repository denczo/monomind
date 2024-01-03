import React, { useEffect } from 'react';
import Slider from '../../atoms/slider/Slider';
import { AudioEngine } from '../../../audio/AudioEngine';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import WfSelector from '../wfselector/WfSelector';
import { OscId } from '../../../types/audio.d';

const Lfo = () => {
    const { bpm, setBpm, freqLp, setFreqLp, gain, setGain } = useGlobalContext();

    useEffect(() => {
        AudioEngine.getInstance().setFreqLp(freqLp);
        AudioEngine.getInstance().setGain(gain);
    }, [bpm, freqLp, gain])

    return (
        <div className="Lfo">
            <WfSelector oscId={OscId.LFO}/>
            <Slider name={"Freq " + AudioEngine.getInstance().gain} value={gain} updateValue={(e) => setGain(parseFloat(e.target.value))} />
            <Slider name={"Gain " + AudioEngine.getInstance().gain} value={gain} updateValue={(e) => setGain(parseFloat(e.target.value))} />
        </div>
    );
}

export default Lfo;