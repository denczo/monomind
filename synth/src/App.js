import './App.css';
import ADSR from './modules/ui/adsr/ADSR';
import Touchpad from './modules/ui/touchpad/Touchpad';
import Waveform from './modules/waveform/Waveform';
import { useState } from "react";

function App() {

  const [waveform, setWaveform] = useState('Triangle');

  return (
    <div className="App">
      <div className="Synth">
      <label id="brand">JBLASTER</label>
      <ADSR />
      <Waveform waveform={setWaveform} label={waveform} />
      <Touchpad width={300} height={300} wf={waveform}/>
      </div>
    </div>
  );
}

export default App;
