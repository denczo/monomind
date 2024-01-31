import React, { useEffect, useState } from "react";
import './Keyboard.css';
import Key from "../../atoms/key/Key.tsx";
import { AudioEngine } from "../../../audio/AudioEngine.tsx";
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import { Scheduler } from "../../../audio/Scheduler.tsx";
import { OscId } from "../../../types/audio.d.tsx";

const Keyboard = ({ notes, keyMap }) => {
    const audioEngine = AudioEngine.getInstance();
    const scheduler = Scheduler.getInstance();
    const { adsrParams, isEditing, currentNote, oscParams, isPlaying } = useGlobalContext();
    const [keyNoteNumber, setKeyNoteNumber] = useState(0);
    const { noteNumber, isActive } = scheduler.noteStates[currentNote];
    const [isKeyDown, setKeyDown] = useState(true);

    const handleClick = (noteNumber) => {
        const freq = renderFrequency(noteNumber);
        const { type, gain } = oscParams[OscId.OSC];
        audioEngine.setOscParams(OscId.OSC, { frequency: freq, type: type, gain: gain });
        audioEngine.onCancleAudio();
        audioEngine.onEnterAudio(adsrParams);
        // scheduler.noteStates[currentNote].isActive = false;
        if (isEditing) {
            // scheduler.jump2Note(currentNote);
            console.log(currentNote, freq)
            scheduler.editNote(freq, type, noteNumber);
        }
    }

    // TODO call only once, not on every render update!
    const renderFrequency = (noteNumber) => {
        return (2 ** ((noteNumber - 69) / 12)) * 440
    }

    const generateKeys = () => {
        return Object.entries(notes).map(([key, value], index) => {
            if (key.includes("#")) {
                return <Key type={"BK"} key={index} isActive={(isPlaying && isActive && value === noteNumber) || (isKeyDown && value === keyNoteNumber)} onMouseDown={() => handleClick(value)} onMouseUp={() => audioEngine.onReleaseAudio(adsrParams)} />
            } else {
                return <Key type={"WK"} key={index} isActive={(isPlaying && isActive && value === noteNumber) || (isKeyDown && value === keyNoteNumber)} onMouseDown={() => handleClick(value)} onMouseUp={() => audioEngine.onReleaseAudio(adsrParams)}/>
            }
        })
    }

    const handleKeyPress = (event) => {
        if(keyMap[event.keyCode] && !isKeyDown){
            console.log("KEY DOWN", isPlaying)
            const noteNumber = keyMap[event.keyCode];
            setKeyNoteNumber(noteNumber)
            handleClick(noteNumber);
            setKeyDown(true);
        }
    };

    const handleKeyRelease = () => {
        console.log("KEY UP")
        audioEngine.onReleaseAudio(adsrParams);
        setKeyDown(false);
    }

    useEffect(() => {
        
        window.addEventListener("keydown", handleKeyPress);
        window.addEventListener("keyup", handleKeyRelease);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("keyup", handleKeyRelease);
        };
    
    }, [adsrParams, isKeyDown]);

    return (<>
        <div className="Keyboard">{generateKeys()}</div>
    </>);
}

export default Keyboard;