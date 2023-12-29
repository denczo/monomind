import Slider from '../slider/Slider.tsx';
import './ADSR.css';
import { useGlobalContext } from '../../../utils/GlobalContext.tsx'
import React, { useEffect } from 'react';
import { Scheduler } from '../../../utils/AudioEngine/Scheduler.tsx';

const ADSR = () => {

  const scheduler = Scheduler.getInstance();

  const {
    attack,
    decay,
    sustain,
    release,
    setAttack,
    setDecay,
    setSustain,
    setRelease,
  } = useGlobalContext();

  useEffect(() => {

    scheduler.setEnv({attack, decay, sustain, release})
  }, [attack, decay, sustain, release, scheduler])

  return (<div className='ADSR'>
    <Slider name={"Attack"} value={attack} updateValue={(e) => setAttack(parseFloat(e.target.value))}/>
    <Slider name={"Decay"} value={decay} updateValue={(e) => setDecay(parseFloat(e.target.value))}/>
    <Slider name={"Sustain"} value={sustain} updateValue={(e) => setSustain(parseFloat(e.target.value))}/>
    <Slider name={"Release"} value={release} updateValue={(e) => setRelease(parseFloat(e.target.value))}/>
  </div>
  );
};

export default ADSR;