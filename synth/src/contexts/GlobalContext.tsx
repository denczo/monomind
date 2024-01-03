import React, { createContext, useContext, useState } from 'react';
import { Params } from '../types/audio.d';

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
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useGlobalContext(){
    return useContext(GlobalContext);
}