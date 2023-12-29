import React from 'react';
import Note from '../Note/Note.tsx';
import './Notes.css';

const Notes = ({ noteStates, setNoteStates, activeNote, isEditing }) => {
  
    return (
        <div className="Notes">
            
            {noteStates.map((noteState, index) => 
                <Note 
                    key={index}
                    isActive={noteState.isActive}
                    isPlayed={index === activeNote}
                    isEditing={isEditing}
                    onClick={() => {
                        const newNoteStates = [...noteStates];
                        newNoteStates[index].isActive = !noteState.isActive;
                        setNoteStates(newNoteStates);
                    }}           
                />
            )}
        </div>
    );
}

export default Notes;