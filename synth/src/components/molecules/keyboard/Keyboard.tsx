import React from "react";
import './Keyboard.css';
import Key from "../../atoms/key/Key.tsx";
import { AudioEngine } from "../../../audio/AudioEngine.tsx";
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import { Scheduler } from "../../../audio/Scheduler.tsx";

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
