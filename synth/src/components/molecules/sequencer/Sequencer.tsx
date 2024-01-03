import React from 'react';
import { useEffect, useState } from 'react';
import Notes from '../notes/Notes.tsx';
import { Scheduler } from '../../../audio/Scheduler.tsx';
import { NoteState } from '../../../types/audio.d.tsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import './Sequencer.css'

const Sequencer = () => {


    const [noteStates, setNoteStates] = useState<NoteState[]>(Array.from({ length: 12 }, () => ({isActive: false, frequency: 0, type: 'triangle' as OscillatorType})));
    const [currentNote, setCurrentNote] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const { isEditing, setEditing } = useGlobalContext();

    const scheduler = Scheduler.getInstance();

    const handleClick = () => {
        if(isPlaying){
            setPlaying(false);
            scheduler.stopScheduler();
            setCurrentNote(0);
        }else{
           scheduler.startScheduler();
           setPlaying(true);
        }
    }

    const handleEditing = () => {
        if (isEditing) {
            setEditing(false);
        } else {
            setEditing(true);
        }
    }

    useEffect(() => {

        scheduler.setNotes(noteStates);
        const observer = newNote => {
            setCurrentNote(newNote);
        };
        scheduler.addObserver(observer);
        // Cleanup: Unsubscribe when the component unmounts
        return () => {
            scheduler.removeObserver(observer);
        };

    }, [noteStates, scheduler])

    return (
        <div className="Sequencer">
            <Notes noteStates={noteStates} setNoteStates={setNoteStates} activeNote={currentNote} isEditing={isEditing} />
            <button onClick={handleClick}>{isPlaying ? "Stop" : "Play"}</button>
            <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
        </div>
    );
}

export default Sequencer;