import Slider from '../../atoms/slider/Slider.tsx';
import './ADSR.css';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx'
import React, { useEffect } from 'react';
import { AudioEngine } from '../../../audio/AudioEngine.tsx';
import Switch from '../../atoms/switch/Switch.tsx';

const ADSR = () => {

  const audioEngine = AudioEngine.getInstance();

  const { adsrParams } = useGlobalContext();

  useEffect(() => {

    audioEngine.setAdsr(adsrParams)
  }, [adsrParams, audioEngine])

  return (<div className='ADSR'>
    <Slider name={"Attack"} value={adsrParams.attack} updateValue={(e) => adsrParams.setAttack(parseFloat(e.target.value))}/>
    <Slider name={"Decay"} value={adsrParams.decay} updateValue={(e) => adsrParams.setDecay(parseFloat(e.target.value))}/>
    <Slider name={"Sustain"} value={adsrParams.sustain} updateValue={(e) => adsrParams.setSustain(parseFloat(e.target.value))}/>
    <Slider name={"Release"} value={adsrParams.release} updateValue={(e) => adsrParams.setRelease(parseFloat(e.target.value))}/>
    <Switch />
  </div>
  );
};

export default ADSR;