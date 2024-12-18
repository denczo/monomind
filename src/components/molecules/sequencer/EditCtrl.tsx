import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../contexts/GlobalContext.tsx";
import { Scheduler } from "../../../audio/Scheduler.tsx";
import "./EditCtrl.css";
import themes from '../../../audio/Themes.json';

const EditCtrl = () => {

    const scheduler = Scheduler.getInstance();

    const { isEditing, setEditing, currentNote, setCurrentNote, isPlaying, setPlaying, preset, setPreset } = useGlobalContext();

    const handleClick = () => {

        if (isEditing) {
            setEditing(false);
            setCurrentNote(0);
            scheduler.stopScheduler();
        }

        if (isPlaying) {
            setPlaying(false);
            scheduler.stopScheduler();
            setCurrentNote(0);
        } else {
            scheduler.startScheduler();
            setPlaying(true);
        }
    }

    const handleEditing = () => {
        if (isEditing) {
            setEditing(false);
            scheduler.stopScheduler();
            setCurrentNote(0);
        } else {
            setEditing(true);
        }
    }

    const handleSkip = () => {
        if (isEditing) {
            const nextNote = (currentNote + 1) % 32
            setCurrentNote(nextNote)
            scheduler.jump2Note(nextNote);
        }
        else {
            const nextPreset = (preset + 1) % Object.values(themes.themes).length
            setPreset(nextPreset);
        }
    }

    return (
        <div id="SeqButtons">
            <button className={isPlaying ? "SeqCtrl play" : "SeqCtrl"} onClick={handleClick}><div className="arrow-right" /></button>
            <button className={isEditing ? "SeqCtrl play" : "SeqCtrl"} onClick={handleEditing}><div className="circle" /></button>
            <button className={"SeqCtrl"} onClick={handleSkip}><div className="arrow-right" /><div className="pipe" /></button>
        </div>);
}

export default EditCtrl;