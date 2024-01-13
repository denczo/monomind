import React, { createContext, useContext, useState } from 'react';
import { Params, OscParams, OscId } from '../types/audio.d';

const GlobalContext = createContext<Params>({
    attack: 0,
    decay: 0,
    sustain: 0,
    release: 0,
    gain: 0,
    isPlaying: false,
    isEditing: false,
    bpm: 0,
    waveform: 'sawtooth',
    freqLp: 500,
    currentNote: 0,
    freqLfo: 5,
    gainLfo: 0,
    oscParams: [{type: 'sawtooth' as OscillatorType, frequency: 0, gain: 0.2}, {type: 'triangle' as OscillatorType, frequency: 0, gain: 0.2}],
    type: ['sawtooth', 'triangle'],
    setAttack: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setDecay: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setSustain: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setRelease: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setGain: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setPlaying: function (value: React.SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
    },
    setEditing: function (value: React.SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
    },
    setBpm: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setWaveform: function (value: React.SetStateAction<string>): void {
        throw new Error('Function not implemented.');
    },
    setFreqLp: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    }, 
    setCurrentNote: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setFreqLfo: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setGainLfo: function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
    },
    setType: function (value: React.SetStateAction<string[]>): void {
        throw new Error('Function not implemented.');
    },
    setOscParams: function (value: React.SetStateAction<any[]>): void {
        throw new Error('Function not implemented.');
    },
});

export function GlobalProvider({ children }){
    const [attack, setAttack] = useState(0.25);
    const [decay, setDecay] = useState(0.75);
    const [sustain, setSustain] = useState(0.5);
    const [release, setRelease] = useState(0.5);
    
    const [gain, setGain] = useState(0.2);
    const [isPlaying, setPlaying] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [bpm, setBpm] = useState(120)
    const [waveform, setWaveform] = useState('sawtooth')
    const [freqLp, setFreqLp] = useState(500);
    const [currentNote, setCurrentNote] = useState(0);
    const [freqLfo, setFreqLfo] = useState(0);
    const [gainLfo, setGainLfo] = useState(0);
    const [oscParams, setOscParams] = useState<OscParams[]>([
        {type: 'sawtooth' as OscillatorType, frequency: 0, gain: 0.2}, 
        {type: 'triangle' as OscillatorType, frequency: 0, gain: 0.2}]);
    const [type, setType] = useState<string[]>([
         'sawtooth',
         'triangle'])


    return (
        <GlobalContext.Provider value={{
            attack,
            decay,
            sustain,
            release,
            gain,
            isPlaying,
            isEditing,
            bpm,
            waveform,
            freqLp,
            currentNote,
            freqLfo,
            gainLfo,
            type,
            oscParams,
            setAttack,
            setDecay,
            setSustain,
            setRelease,
            setGain,
            setPlaying,
            setEditing,
            setBpm,
            setWaveform,
            setFreqLp,
            setCurrentNote,
            setFreqLfo,
            setGainLfo,
            setType,
            setOscParams,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useGlobalContext(){
    return useContext(GlobalContext);
}