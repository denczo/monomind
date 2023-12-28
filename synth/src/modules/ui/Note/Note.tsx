import React from 'react';
import './Note.css';

const Note = ({ isActive, isPlayed, onClick }) => {

    return (
        <div className={isActive ? (isPlayed ? "Note active played": "Note active") : (isPlayed ? "Note played": "Note")} onClick={onClick}></div>
    );
}

export default Note;
