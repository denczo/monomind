import React, { createContext, useContext, useState } from 'react';
import { Params, OscParams, AdsrParams } from '../types/audio.d';

const GlobalContext = createContext<Params>({
    adsrParams: {
        value: 0,
        attack: 0,
        decay: 0,
        sustain: 0,
        release: 0,
        setValue: function (): void {},
        setAttack: function (): void {},
        setDecay: function (): void {},
        setSustain: function (): void {},
        setRelease: function (): void {},
    },
    isPlaying: false,
    isEditing: false,
    bpm: 0,
    freqLp: 0,
    currentNote: 0,
    freqLfo: 0,
    gainLfo: 0,
    oscParams: [],
    setPlaying: function (): void {},
    setEditing: function (): void {},
    setBpm: function (): void {},
    setFreqLp: function (): void {}, 
    setCurrentNote: function (): void {},
    setFreqLfo: function (): void {},
    setGainLfo: function (): void {},
    setOscParams: function (): void {},
});

export function GlobalProvider({ children }){

    const [adsrParams, setAdsrParams] = useState<AdsrParams>({
        value: 0.5,
        attack: 0.1,
        decay: 0.8,
        sustain: 0.8,
        release: 0.6,
        setValue: (newValue) => setAdsrParams((prev) => ({ ...prev, value: newValue })),
        setAttack: (newValue) => setAdsrParams((prev) => ({ ...prev, attack: newValue })),
        setDecay: (newValue) => setAdsrParams((prev) => ({ ...prev, decay: newValue })),
        setSustain: (newValue) => setAdsrParams((prev) => ({ ...prev, sustain: newValue })),
        setRelease: (newValue) => setAdsrParams((prev) => ({ ...prev, release: newValue })),
    });

    const [isPlaying, setPlaying] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [bpm, setBpm] = useState(120)
    const [freqLp, setFreqLp] = useState(500);
    const [currentNote, setCurrentNote] = useState(0);
    const [freqLfo, setFreqLfo] = useState(0);
    const [gainLfo, setGainLfo] = useState(0);
    const [oscParams, setOscParams] = useState<OscParams[]>([
        {type: 'sawtooth' as OscillatorType, frequency: 0, gain: 0.5}, 
        {type: 'triangle' as OscillatorType, frequency: 0, gain: 0.2}]);


    return (
        <GlobalContext.Provider value={{
            adsrParams,
            isPlaying,
            isEditing,
            bpm,
            freqLp,
            currentNote,
            freqLfo,
            gainLfo,
            oscParams,
            setPlaying,
            setEditing,
            setBpm,
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