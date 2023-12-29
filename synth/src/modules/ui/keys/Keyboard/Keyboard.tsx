import React from "react";
import './Keyboard.css';
import Key from "../Key/Key.tsx";
import AudioEngine from "../../../../utils/AudioEngine/AudioEngine.tsx";
import { useGlobalContext } from '../../../../utils/GlobalContext.tsx';
import { Scheduler } from "../../../../utils/AudioEngine/Scheduler.tsx";

const Keyboard = ({ notes }) => {
    const audioEngine = AudioEngine.getInstance();
    const scheduler = Scheduler.getInstance();
    const { attack, sustain, release, isEditing } = useGlobalContext();

    const handleClick = (noteNumber) => {
        const freq = renderFrequency(noteNumber);
        audioEngine.playNote(attack, sustain, release, freq);
        if (isEditing) {
            scheduler.editNote(freq);
        }
    }

    const renderFrequency = (noteNumber) => {
        return (2 ** ((noteNumber - 69) / 12)) * 440
    }

    const generateKeys = () => {

        return Object.entries(notes).map(([key, value], index) => {
            if (key.includes("#")) {
                return <Key type={"BK"} key={index} onClick={() => handleClick(value)} />
            } else {
                return <Key type={"WK"} key={index} onClick={() => handleClick(value)} />
            }
        })
    }

    return (<>
        <div className="Keyboard">{generateKeys()}</div>
    </>);
}

export default Keyboard;
