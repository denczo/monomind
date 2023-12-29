import React from 'react';
import './Note.css';

const Note = ({ isActive, isPlayed, isEditing, onClick }) => {


    const state = () => {
        
        let className = "Note ";

        if(isActive){
            className += "active "
        }

        if(isPlayed){
            className += "played "
        }

        if(isEditing){
            className += "edit "
        }

        return className
    }

    return (
        <div className={state()} onClick={onClick}></div>
    );
}

export default Note;
