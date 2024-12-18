import React, { createContext, useContext, useState } from 'react';
import { Params, OscParams, AdsrParams } from '../types/audio.d';

const GlobalContext = createContext<Params>({
    adsrParams: {
        value: 0,
        mode: true,
        attack: 0,
        decay: 0,
        sustain: 0,
        release: 0,
        setValue: function (): void {},
        setMode: function (): void {},
        setAttack: function (): void {},
        setDecay: function (): void {},
        setSustain: function (): void {},
        setRelease: function (): void {},
    },
    isPlaying: false,
    isEditing: false,
    preset: 0,
    bpm: 0,
    freqLp: 0,
    currentNote: 0,
    freqLfo: 0,
    gainLfo: 0,
    oscParams: [],
    setPlaying: function (): void {},
    setEditing: function (): void {},
    setPreset: function (): void {},
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
        mode: true,
        attack: 0.2,
        decay: 0.8,
        sustain: 0.8,
        release: 0.8,
        setValue: (newValue) => setAdsrParams((prev) => ({ ...prev, value: newValue })),
        setMode: (newValue) => setAdsrParams((prev) => ({ ...prev, mode: newValue })),
        setAttack: (newValue) => setAdsrParams((prev) => ({ ...prev, attack: newValue })),
        setDecay: (newValue) => setAdsrParams((prev) => ({ ...prev, decay: newValue })),
        setSustain: (newValue) => setAdsrParams((prev) => ({ ...prev, sustain: newValue })),
        setRelease: (newValue) => setAdsrParams((prev) => ({ ...prev, release: newValue })),
    });

    const [isPlaying, setPlaying] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [preset, setPreset] = useState(0);
    const [bpm, setBpm] = useState(360)
    const [freqLp, setFreqLp] = useState(1700);
    const [currentNote, setCurrentNote] = useState(0);
    const [freqLfo, setFreqLfo] = useState(200);
    const [gainLfo, setGainLfo] = useState(200);
    const [oscParams, setOscParams] = useState<OscParams[]>([
        {type: 'square' as OscillatorType, frequency: 0, gain: 0.5}, 
        {type: 'triangle' as OscillatorType, frequency: 6, gain: 1.8}]);


    return (
        <GlobalContext.Provider value={{
            adsrParams,
            isPlaying,
            isEditing,
            preset,
            bpm,
            freqLp,
            currentNote,
            freqLfo,
            gainLfo,
            oscParams,
            setPlaying,
            setEditing,
            setPreset,
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