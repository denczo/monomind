import { useEffect, useState } from 'react';
import Notes from '../Notes/Notes.js';
import { Scheduler } from '../../../utils/AudioEngine/Scheduler.tsx';

const Sequencer = () => {

    const [noteStates, setNoteStates] = useState(Array.from({ length: 10 }, () => false));
    const [currentNote, setCurrentNote] = useState(0);
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
        <div>
            {scheduler.tempo}
            <Notes noteStates={noteStates} setNoteStates={setNoteStates} activeNote={currentNote} />
            <button onClick={() => scheduler.startScheduler()}>Play</button>
        </div>
    );
}

export default Sequencer;