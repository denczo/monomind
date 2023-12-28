import React from 'react';
import { useEffect, useState } from 'react';
import Notes from '../Notes/Notes.tsx';
import { Scheduler } from '../../../utils/AudioEngine/Scheduler.tsx';
import { NoteState } from '../../../utils/audio.d.tsx';
import { useGlobalContext } from '../../../utils/GlobalContext.js';

const Sequencer = () => {


    const [noteStates, setNoteStates] = useState<NoteState[]>(Array.from({ length: 10 }, () => ({isActive: false, frequency: 0})));
    const [currentNote, setCurrentNote] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const { attack, decay, sustain, release } = useGlobalContext();

    const scheduler = Scheduler.getInstance();

    const handleClick = () => {
        if(isPlaying){
            setPlaying(false);
            scheduler.stopScheduler();
        }else{
           scheduler.startScheduler();
           setPlaying(true);
        }
    }


    useEffect(() => {

        scheduler.setNotes(noteStates);
        const observer = newNote => {
            setCurrentNote(newNote);
        };
        scheduler.setEnv({attack, decay, sustain, release});
        scheduler.addObserver(observer);

        // Cleanup: Unsubscribe when the component unmounts
        return () => {
            scheduler.removeObserver(observer);
        };

    }, [noteStates, scheduler])

    return (
        <div>
            {scheduler.tempo}
            <Notes noteStates={noteStates} setNoteStates={setNoteStates} activeNote={currentNote} />
            <button onClick={handleClick}>{isPlaying ? "Stop" : "Play"}</button>
        </div>
    );
}

export default Sequencer;