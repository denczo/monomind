import './App.css';
import { GlobalProvider } from './contexts/GlobalContext.tsx';
import Sequencer from './components/molecules/sequencer/Sequencer.tsx';
import Keyboard from './components/molecules/keyboard/Keyboard.tsx';
import React from 'react';
import Controls from './components/organism/controls/Controls.tsx';
import Visualizer from './components/atoms/visualizer/Visualizer.tsx';
import EditCtrl from './components/molecules/sequencer/EditCtrl.tsx';
import Footer from './components/atoms/footer/Footer.tsx';



function App() {

  const notes = { 'C2': 36, 'C#2': 37, 'D2': 38, 'D#2': 39, 'E2': 40, 'F2': 41, 'F#2': 42, 'G2': 43, 'G#2': 44, 'A2': 45, 'A#2': 46, 'B2': 47, 'C3': 48, 'C3#': 49, 'D3': 50, 'D#3': 51, 'E3': 52, 'F3': 53, 'F#3': 54, 'G3': 55, 'G#3': 56, 'A3': 57, 'A#3': 58, 'B3': 59, 'C4': 60 }
  // key code mapped to note number
  const keyMap = {65: 36, 87: 37, 83: 38, 69: 39, 68: 40, 70: 41, 84: 42, 71: 43, 89: 44, 72: 45, 85: 46, 74: 47, 75: 48}
  return (
    <GlobalProvider>

      <div className="App">

        <div id="SynthWrapper">

        <h3 id="headline">MonoMind - a monophonic synthesizer powered by the Web Audio API</h3>
        <div className="Synth">
          <div className='SliderSection'>
            <Controls />
          </div>
          <Sequencer />
          <div id='VizSection'>
            <EditCtrl />
            <Visualizer />
            <div className='LabelPlacement'>
              <span id='Label'>MonoMind</span>
            </div>
          </div>
            <Keyboard notes={notes} keyMap={keyMap} />
        </div>

        </div>
         <Footer />
      </div>
    
    </GlobalProvider>
  );
}

export default App;
