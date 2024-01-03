import Slider from '../../atoms/slider/Slider.tsx';
import './ADSR.css';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx'
import React, { useEffect } from 'react';
import { AudioEngine } from '../../../audio/AudioEngine.tsx';

const ADSR = () => {

  const audioEngine = AudioEngine.getInstance();

  const {
    attack,
    decay,
    sustain,
    release,
    gain,
    setAttack,
    setDecay,
    setSustain,
    setRelease,
  } = useGlobalContext();

  useEffect(() => {

    audioEngine.setAdsr({value: gain, attack, decay, sustain, release})
  }, [attack, decay, sustain, release, audioEngine])

  return (<div className='ADSR'>
    <Slider name={"Attack"} value={attack} updateValue={(e) => setAttack(parseFloat(e.target.value))}/>
    <Slider name={"Decay"} value={decay} updateValue={(e) => setDecay(parseFloat(e.target.value))}/>
    <Slider name={"Sustain"} value={sustain} updateValue={(e) => setSustain(parseFloat(e.target.value))}/>
    <Slider name={"Release"} value={release} updateValue={(e) => setRelease(parseFloat(e.target.value))}/>
  </div>
  );
};

export default ADSR;