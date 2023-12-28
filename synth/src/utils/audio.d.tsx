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