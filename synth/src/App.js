import './App.css';
import ADSR from './modules/ui/adsr/ADSR';
import Touchpad from './modules/ui/touchpad/Touchpad';
import Waveform from './modules/waveform/Waveform';
import { useState } from "react";
import { GlobalProvider } from './utils/GlobalContext';
import Sequencer from './modules/ui/sequencer/Sequencer';
import Keyboard from './modules/ui/keys/Keyboard/Keyboard.tsx';



function App() {

  const [waveform, setWaveform] = useState('Sawtooth');
  const notes = {'C2': 36, 'C#2': 37, 'D2': 38, 'D#2': 39, 'E2': 40, 'F2': 41, 'F#2': 42, 'G2': 43, 'G#2': 44, 'A2': 45, 'A#2': 46, 'B2': 47, 'C3': 48}
  
  return (
    <GlobalProvider>
      <div className="App">
        <div className="Synth">
        {/* <label id="brand">JBLASTER</label> */}
        <ADSR />
        {/* <Waveform waveform={setWaveform} label={waveform} /> */}
        {/* <Touchpad width={300} height={300} wf={waveform}/> */}
        <Sequencer/>
        <Keyboard notes={notes}/>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
