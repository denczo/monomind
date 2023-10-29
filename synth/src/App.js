import './App.css';
import ADSR from './modules/ui/adsr/ADSR';
import Touchpad from './modules/ui/touchpad/Touchpad';
import Waveform from './modules/waveform/Waveform';
import { useState } from "react";
import { GlobalProvider } from './utils/GlobalContext';

function App() {

  const [waveform, setWaveform] = useState('Sawtooth');

  return (
    <GlobalProvider>
      <div className="App">
        <div className="Synth">
        <label id="brand">JBLASTER</label>
        <ADSR />
        <Waveform waveform={setWaveform} label={waveform} />
        <Touchpad width={300} height={300} wf={waveform}/>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
