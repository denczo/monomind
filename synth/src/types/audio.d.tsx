export enum Waveform {
    triangle = 2,
    sawtooth = 1,
    square = 0
}

export enum OscId {
    OSC = 0,
    LFO = 1
}

export interface NoteState {
    isActive: boolean;
    frequency: number;
    type: OscillatorType;
    noteNumber: number;
}

export interface AdsrParams {
    //for gadsr it's gain, for fadsr it's frequency
    value: number;
    mode: boolean;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
    setAttack:  React.Dispatch<React.SetStateAction<number>>;
    setDecay:  React.Dispatch<React.SetStateAction<number>>;
    setSustain: React.Dispatch<React.SetStateAction<number>>;
    setRelease: React.Dispatch<React.SetStateAction<number>>;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OscParams{
    type: OscillatorType;
    frequency: number;
    gain: number;
}

export interface Params {
    adsrParams: AdsrParams;
    isPlaying: boolean;
    isEditing: boolean;
    bpm: number;
    freqLp: number;
    oscParams: OscParams[];
    currentNote: number;
    freqLfo: number;
    gainLfo: number;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setBpm: React.Dispatch<React.SetStateAction<number>>;
    setFreqLp: React.Dispatch<React.SetStateAction<number>>;
    setCurrentNote: React.Dispatch<React.SetStateAction<number>>;
    setFreqLfo: React.Dispatch<React.SetStateAction<number>>;
    setGainLfo: React.Dispatch<React.SetStateAction<number>>;
    setOscParams: React.Dispatch<React.SetStateAction<OscParams[]>>;
}