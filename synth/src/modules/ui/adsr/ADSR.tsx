import Slider from '../slider/Slider';
import './ADSR.css';
import { useGlobalContext } from '../../../utils/GlobalContext'
import React from 'react';

const ADSR = () => {

  const {
    attack,
    decay,
    sustain,
    release,
    updateAttack,
    updateDecay,
    updateSustain,
    updateRelease,
  } = useGlobalContext();

  return (<div className='ADSR'>
    <Slider name={"Attack"} value={attack} updateValue={(e) => updateAttack(e.target.value)}/>
    <Slider name={"Decay"} value={decay} updateValue={(e) => updateDecay(e.target.value)}/>
    <Slider name={"Sustain"} value={sustain} updateValue={(e) => updateSustain(e.target.value)}/>
    <Slider name={"Release"} value={release} updateValue={(e) => updateRelease(e.target.value)}/>
  </div>
  );
};

export default ADSR;