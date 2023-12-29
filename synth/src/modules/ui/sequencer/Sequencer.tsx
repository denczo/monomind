import React from 'react';
import { useEffect, useState } from 'react';
import Notes from '../Notes/Notes.tsx';
import { Scheduler } from '../../../utils/AudioEngine/Scheduler.tsx';
import { NoteState } from '../../../utils/audio.d.tsx';
import { useGlobalContext } from '../../../utils/GlobalContext.tsx';
import './Sequencer.css'
import Slider from '../slider/Slider.tsx';
import AudioEngine from '../../../utils/AudioEngine/AudioEngine.tsx';

const Sequencer = () => {


    const [noteStates, setNoteStates] = useState<NoteState[]>(Array.from({ length: 12 }, () => ({isActive: false, frequency: 0})));
    const [currentNote, setCurrentNote] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const { isEditing, setEditing, bpm, setBpm, freqLp, setFreqLp } = useGlobalContext();

    const scheduler = Scheduler.getInstance();
    const audioEngine = AudioEngine.getInstance();

    const handleClick = () => {
        if(isPlaying){
            setPlaying(false);
            scheduler.stopScheduler();
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
        scheduler.setTempo(bpm);
        audioEngine.setFreqLp(freqLp);
        // Cleanup: Unsubscribe when the component unmounts
        return () => {
            scheduler.removeObserver(observer);
        };

    }, [noteStates, scheduler, bpm, freqLp])

    return (
        <div className="Sequencer">
            <Notes noteStates={noteStates} setNoteStates={setNoteStates} activeNote={currentNote} isEditing={isEditing} />
            <Slider name={"BPM "+scheduler.tempo} value={bpm} max={200} updateValue={(e) => setBpm(parseFloat(e.target.value))} />
            <Slider name={"LP "+audioEngine.freqLp} value={freqLp} max={2000} updateValue={(e) => {setFreqLp(parseFloat(e.target.value));console.log(e.target.value)}} />
            <button onClick={handleClick}>{isPlaying ? "Stop" : "Play"}</button>
            <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>

        </div>
    );
}

export default Sequencer;