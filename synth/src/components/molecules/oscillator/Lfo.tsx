import React, { useEffect } from 'react';
import Slider from '../../atoms/slider/Slider.tsx';
import { AudioEngine } from '../../../audio/AudioEngine.tsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import WfSelector from '../wfselector/WfSelector.tsx';
import { OscId } from '../../../types/audio.d.tsx';
import "./Osc.css"
import Switch from '../../atoms/switch/Switch.tsx';

const Lfo = () => {
    const { oscParams, setOscParams } = useGlobalContext();
    const { frequency, gain, type } = oscParams[OscId.LFO];

    const updateFreq = (index: OscId, newValue: number) => {
        setOscParams((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[index].frequency = newValue;
          return updatedItems;
        });
    };

    const updateGain = (index: OscId, newValue: number) => {
        setOscParams((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[index].gain = newValue;
          return updatedItems;
        });
    };

    useEffect(() => {
        AudioEngine.getInstance().setOscParams(OscId.LFO, {gain: gain, frequency: frequency, type: type})
    }, [type, gain, frequency])

    return (
        <div className="Osc">
            <WfSelector oscId={OscId.LFO}/>
            <Slider name={"Freq "} value={frequency} max={20} updateValue={(e) => updateFreq(OscId.LFO, parseFloat(e.target.value))} />
            <Slider name={"Gain "} value={gain} max={30} updateValue={(e) => updateGain(OscId.LFO, parseFloat(e.target.value))} />
            <Switch />
        </div>
    );
}

export default Lfo;