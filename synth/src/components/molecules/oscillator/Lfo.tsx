import React, { useEffect } from 'react';
import Slider from '../../atoms/slider/Slider.tsx';
import { AudioEngine } from '../../../audio/AudioEngine.tsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import WfSelector from '../wfselector/WfSelector.tsx';
import { OscId } from '../../../types/audio.d.tsx';
import "./Osc.css"

const Lfo = () => {
    const { freqLfo, setFreqLfo, gainLfo, setGainLfo } = useGlobalContext();

    useEffect(() => {
        AudioEngine.getInstance().setOscParams(OscId.LFO, {gain: gainLfo, frequency: freqLfo})
    }, [freqLfo, gainLfo])

    return (
        <div className="Osc">
            <WfSelector oscId={OscId.LFO}/>
            <Slider name={"Freq "} value={freqLfo} max={20} updateValue={(e) => setFreqLfo(parseFloat(e.target.value))} />
            <Slider name={"Gain "} value={gainLfo} max={30} updateValue={(e) => setGainLfo(parseFloat(e.target.value))} />
        </div>
    );
}

export default Lfo;