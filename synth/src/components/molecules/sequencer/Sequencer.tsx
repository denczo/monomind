import React from 'react';
import { useEffect, useState } from 'react';
import Notes from '../notes/Notes.tsx';
import { Scheduler } from '../../../audio/Scheduler.tsx';
import { NoteState } from '../../../types/audio.d.tsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import './Sequencer.css'

const Sequencer = () => {

    const [noteStates, setNoteStates] = useState<NoteState[]>(Array.from({ length: 16 }, () => ({isActive: false, frequency: 0, type: 'triangle' as OscillatorType, noteNumber: 0})));
    const { isEditing, currentNote, setCurrentNote } = useGlobalContext();

    const scheduler = Scheduler.getInstance();

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
        </div>
    );
}

export default Sequencer;