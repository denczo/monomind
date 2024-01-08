import React, { useEffect, useState } from "react";
import './Keyboard.css';
import Key from "../../atoms/key/Key.tsx";
import { AudioEngine } from "../../../audio/AudioEngine.tsx";
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';
import { Scheduler } from "../../../audio/Scheduler.tsx";
import { AdsrParams, OscId } from "../../../types/audio.d.tsx";

const Keyboard = ({ notes }) => {
    const audioEngine = AudioEngine.getInstance();
    const scheduler = Scheduler.getInstance();
    const { attack, decay, sustain, release, isEditing, currentNote, oscParams } = useGlobalContext();

    const handleClick = (noteNumber) => {
        const freq = renderFrequency(noteNumber);
        const { type, gain } = oscParams[OscId.OSC];
        audioEngine.setOscParams(OscId.OSC, {frequency: freq, type: type, gain: gain});
        audioEngine.setAudioChain(false, {attack, decay, sustain, release} as AdsrParams)
        if (isEditing) {
            scheduler.editNote(freq, type, noteNumber);
        }
    }

    const renderFrequency = (noteNumber) => {
        return (2 ** ((noteNumber - 69) / 12)) * 440
    }

    const generateKeys = () => {

        return Object.entries(notes).map(([key, value], index) => {
            const { noteNumber, isActive } = scheduler.noteStates[currentNote];
            if (key.includes("#")) {
                return <Key type={"BK"} key={index} isActive={isActive && value==noteNumber} onClick={() => handleClick(value)} />
            } else {
                return <Key type={"WK"} key={index} isActive={isActive && value==noteNumber} onClick={() => handleClick(value)} />
            }
        })
    }

    return (<>
        <div className="Keyboard">{generateKeys()}</div>
    </>);
}

export default Keyboard;