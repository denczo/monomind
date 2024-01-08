export interface NoteState {
    isActive: boolean;
    frequency: number;
    type: OscillatorType;
    noteNumber: number;
}

export interface AdsrParams {
    //for gadsr it's gain, for fadsr it's frequency
    value: number;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
}

export interface OscParams{
    type: OscillatorType;
    frequency: number;
    gain: number;
}

export interface Params {
    attack: number;
    decay: number;
    sustain: number;
    release: number;    
    gain: number;
    isPlaying: boolean;
    isEditing: boolean;
    bpm: number;
    waveform: string;
    freqLp: number;
    type: string[];
    oscParams: OscParams[];
    currentNote: number;
    freqLfo: number;
    gainLfo: number;
    setAttack:  React.Dispatch<React.SetStateAction<number>>;
    setDecay:  React.Dispatch<React.SetStateAction<number>>;
    setSustain: React.Dispatch<React.SetStateAction<number>>;
    setRelease: React.Dispatch<React.SetStateAction<number>>;
    setGain: React.Dispatch<React.SetStateAction<number>>;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setBpm: React.Dispatch<React.SetStateAction<number>>;
    setWaveform: React.Dispatch<React.SetStateAction<string>>;
    setFreqLp: React.Dispatch<React.SetStateAction<number>>;
    setCurrentNote: React.Dispatch<React.SetStateAction<number>>;
    setFreqLfo: React.Dispatch<React.SetStateAction<number>>;
    setGainLfo: React.Dispatch<React.SetStateAction<number>>;
    setType: React.Dispatch<React.SetStateAction<string[]>>;
    setOscParams: React.Dispatch<React.SetStateAction<OscParams[]>>;
}

export enum Waveform {
    triangle = 2,
    sawtooth = 1,
    square = 0
}

export enum OscId {
    OSC = 0,
    LFO = 1
}