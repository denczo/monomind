import React, { useEffect } from 'react';
import Slider from '../../atoms/slider/Slider.tsx';
import { AudioEngine } from '../../../audio/AudioEngine.tsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import WfSelector from '../wfselector/WfSelector.tsx';
import { OscId } from '../../../types/audio.d.tsx';
import "./Osc.css"

const Osc = () => {
    const { gain, setGain } = useGlobalContext();


    useEffect(() => {
        AudioEngine.getInstance().setGain(gain);
    }, [gain])


    return (
        <div className="Osc">
            <WfSelector oscId={OscId.OSC1}/>
            <Slider name={"Gain"} value={gain} updateValue={(e) => setGain(parseFloat(e.target.value))} />
        </div>
    );
}

export default Osc;