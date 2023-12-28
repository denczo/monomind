import { Env, NoteState } from "../audio.d.tsx";
import AudioEngine from "./AudioEngine.tsx";

export class Scheduler {

    private static instance: Scheduler | null = null;
    tempo: number;
    currentNote: number;
    nextNoteTime: number;
    timerId: number;
    lookahead: number;
    scheduleAheadTime: number;
    notesInQueue: { note: number, time: number }[];
    timerID: ReturnType<typeof setTimeout>;
    noteStates: NoteState[];
    audioEngine: AudioEngine;
    currentNoteCallbacks: any[];
    observers: any[];
    adsr: Env;


    private constructor(tempo: number = 120, currentNote: number = 0, nextNoteTime: number = 2.0, lookahead: number = 25.0, scheduleAheadTime: number = 0.1) {
        this.tempo = tempo;
        this.currentNote = currentNote;
        this.nextNoteTime = nextNoteTime;
        this.lookahead = lookahead;
        this.scheduleAheadTime = scheduleAheadTime;
        this.notesInQueue = [];
        this.scheduler = this.scheduler.bind(this);
        this.noteStates = []
        this.audioEngine = AudioEngine.getInstance();
        this.currentNoteCallbacks = []
        this.observers = [];
    }

    public static getInstance(): Scheduler {
        if (!Scheduler.instance) {
            Scheduler.instance = new Scheduler();
        }
        return Scheduler.instance;
    }

    public notifyObservers(): void {
        this.observers.forEach(observer => observer(this.currentNote));
    }

    public addObserver(observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    private nextNote(amountNotes: number): void {
        const secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time
        // Advance the beat number, wrap to zero when reaching 4
        this.currentNote = (this.currentNote + 1) % amountNotes;
    }

    private scheduleNote(noteStates: NoteState[]): void {
        const beatNumber = this.currentNote;
        // Push the note on the queue, even if we're not playing.
        this.notesInQueue.push({ note: beatNumber, time: this.nextNoteTime });
        this.notifyObservers();

        if (noteStates[beatNumber].isActive) {
            this.audioEngine.playNote(this.adsr.attack, this.adsr.sustain, this.adsr.release, noteStates[beatNumber].frequency);
            console.log('played')
        }
    }

    public scheduler(): void {
        const currentTime = this.audioEngine.actx.currentTime;
        // While there are notes that will need to play before the next interval,
        // schedule them and advance the pointer.

        while (this.nextNoteTime < currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.noteStates);
            this.nextNote(this.noteStates.length);
        }
        clearTimeout(this.timerID);
        this.timerID = setTimeout(this.scheduler, this.lookahead);
    }

    public editNote(frequency: number): void{
        this.noteStates[this.currentNote] = {isActive: true, frequency: frequency}
        this.currentNote = (this.currentNote + 1) % this.noteStates.length;
    }


    public startScheduler(): void {
        // Start the scheduling loop after a short delay
        setTimeout(() => {
            this.scheduler();
        }, 10);
    }

    public stopScheduler(): void {
        if(this.timerID){
            clearTimeout(this.timerID);
            this.currentNote = 0;
        }
    }

    public setNotes(noteStates: NoteState[]) {
        this.noteStates = noteStates;
    }

    public setEnv(adsr: Env){
        this.adsr = adsr;
    }
}