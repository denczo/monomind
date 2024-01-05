import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../contexts/GlobalContext.tsx";
import { Scheduler } from "../../../audio/Scheduler.tsx";
import "./EditCtrl.css";

const EditCtrl = () => {

    const scheduler = Scheduler.getInstance();

    const [isPlaying, setPlaying] = useState(false);
    const { isEditing, setEditing, setCurrentNote } = useGlobalContext();

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

    return (
        <div id="SeqButtons">
        <button className={isPlaying? "SeqCtrl play" : "SeqCtrl"} onClick={handleClick}><div className="arrow-right" /></button>
        <button className={isEditing? "SeqCtrl play" : "SeqCtrl"} onClick={handleEditing}><div className="circle" /></button>
    </div>   );
}

export default EditCtrl;