import React, { useEffect } from 'react';
import './WfSelector.css';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx'
import { AudioEngine } from '../../../audio/AudioEngine.tsx';
import Slider from '../../atoms/slider/Slider.tsx';
import { OscId, Waveform } from '../../../types/audio.d.tsx';

const WfSelector = ({oscId} : {oscId: OscId}) => {

    const {oscParams, setOscParams} = useGlobalContext();
    const audioEngine = AudioEngine.getInstance();


    const updateItem = (index: OscId, newValue: string) => {
        setOscParams((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[index].type = newValue as OscillatorType;
          return updatedItems;
        });
      };

    useEffect(() => {
        if(oscParams[oscId]?.frequency !== undefined && oscParams[oscId]?.type !== undefined && oscParams[oscId]?.gain !== undefined){
        const {type, frequency, gain} = oscParams[oscId];
            audioEngine.setOscParams(oscId, {type: type, frequency: frequency, gain: gain});
        }
    }, [oscParams, audioEngine, oscId]);

    return (
        <div className="WfSelector">
            <div className='sublabel'>
                <span>Tri</span>
                <span>Saw</span>
                <span>Squ</span>
            </div>
            <Slider max={2} step={1} name={""} value={Waveform[oscParams[oscId].type]} updateValue={(e) => updateItem(oscId, Waveform[e.target.value])} />
        </div>
    );
}

export default WfSelector;