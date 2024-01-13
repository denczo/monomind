import React, { createContext, useContext, useState } from 'react';
import { Params, OscParams, AdsrParams } from '../types/audio.d';

const GlobalContext = createContext<Params>({
    adsrParams: {
        value: 0,
        attack: 0.25,
        decay: 0.5,
        sustain: 0.5,
        release: 0.25,
        setValue: function (value: React.SetStateAction<number>): void {
            throw new Error('Function not implemented.');
        },
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
    },
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

    setOscParams: function (value: React.SetStateAction<any[]>): void {
        throw new Error('Function not implemented.');
    },
});

export function GlobalProvider({ children }){

    const [adsrParams, setAdsrParams] = useState<AdsrParams>({
        value: 0.2,
        attack: 0.2,
        decay: 0.2,
        sustain: 0.2,
        release: 0.2,
        setValue: (newValue) => setAdsrParams((prev) => ({ ...prev, value: newValue })),
        setAttack: (newValue) => setAdsrParams((prev) => ({ ...prev, attack: newValue })),
        setDecay: (newValue) => setAdsrParams((prev) => ({ ...prev, decay: newValue })),
        setSustain: (newValue) => setAdsrParams((prev) => ({ ...prev, sustain: newValue })),
        setRelease: (newValue) => setAdsrParams((prev) => ({ ...prev, release: newValue })),
    });

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


    return (
        <GlobalContext.Provider value={{
            adsrParams,
            gain,
            isPlaying,
            isEditing,
            bpm,
            waveform,
            freqLp,
            currentNote,
            freqLfo,
            gainLfo,
            oscParams,
            setGain,
            setPlaying,
            setEditing,
            setBpm,
            setWaveform,
            setFreqLp,
            setCurrentNote,
            setFreqLfo,
            setGainLfo,
            setOscParams,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useGlobalContext(){
    return useContext(GlobalContext);
}