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
    noteStates: boolean[];
    audioEngine: AudioEngine;
    currentNoteCallbacks: any[];
    observers: any[];


    private constructor(tempo: number = 120, currentNote: number = 0, nextNoteTime: number = 2.0, lookahead: number = 25.0, scheduleAheadTime: number = 0.1) {
        this.tempo = tempo;
        this.currentNote = currentNote;
        this.nextNoteTime = nextNoteTime;
        this.lookahead = lookahead;
        this.scheduleAheadTime = scheduleAheadTime;
        this.notesInQueue = [];
        this.scheduler = this.scheduler.bind(this);
        this.noteStates = [true, false, true, false, true, false, true, false, true, true]
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

    private scheduleNote(noteStates: boolean[]): void {
        const beatNumber = this.currentNote;
        // Push the note on the queue, even if we're not playing.
        this.notesInQueue.push({ note: beatNumber, time: this.nextNoteTime });
        this.notifyObservers();

        if (noteStates[beatNumber]) {
            this.audioEngine.playNote(0, 0.2, 0.1);
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


    public startScheduler(): void {
        // Start the scheduling loop after a short delay
        setTimeout(() => {
            this.scheduler();
        }, 10);
    }

    public setNotes(noteStates: boolean[]) {
        this.noteStates = noteStates;
    }
}