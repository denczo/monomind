import React, { useEffect } from 'react';
import Note from '../../atoms/note/Note.tsx';
import './Notes.css';
import { Scheduler } from '../../../audio/Scheduler.tsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.tsx';

const Notes = ({ noteStates, setNoteStates, activeNote }) => {
  
    const { isEditing } = useGlobalContext();

    const handleClick = (isEditing, noteState, index)  => {

        if(isEditing){
            Scheduler.getInstance().jump2Note(index);
        }else{
            const newNoteStates = [...noteStates];
            newNoteStates[index].isActive = !noteState.isActive;
            setNoteStates(newNoteStates); 
        }
    }

    return (
        <div className="Notes">
            
            {noteStates.map((noteState, index) => 
                <Note 
                    key={index}
                    isActive={noteState.isActive}
                    isPlayed={index === activeNote}
                    isEditing={isEditing}
                    onClick={() => handleClick(isEditing, noteState, index)}         
                />
            )}
        </div>
    );
}

export default Notes;