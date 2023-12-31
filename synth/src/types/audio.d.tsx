export interface NoteState {
    isActive: boolean;
    frequency: number;
}

export interface Env {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
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

}

export enum Waveform {
    triangle = 2,
    sawtooth = 1,
    square = 0
}