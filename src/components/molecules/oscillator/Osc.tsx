import React, { useEffect } from 'react';
import Slider from '../../atoms/slider/Slider.tsx';
import { AudioEngine } from '../../../audio/AudioEngine.tsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import WfSelector from '../wfselector/WfSelector.tsx';
import { OscId } from '../../../types/audio.d.tsx';
import "./Osc.css"

const Osc = () => {
    const { oscParams, setOscParams } = useGlobalContext();
    const { gain, type, frequency } = oscParams[OscId.OSC];

    const updateGain = (index: OscId, newValue: number) => {
        setOscParams((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[index].gain = newValue;
          return updatedItems;
        });
    };

    useEffect(() => {
        AudioEngine.getInstance().setOscParams(OscId.OSC, {type: type, gain: gain, frequency: frequency})
    }, [gain])


    return (
        <div className="Osc">
            <WfSelector oscId={OscId.OSC}/>
            <Slider name={"Gain"} value={gain} updateValue={(e) => updateGain(OscId.OSC, parseFloat(e.target.value))} />
        </div>
    );
}

export default Osc;