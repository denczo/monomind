import Note from '../Note/Note';
import './Notes.css';

const Notes = ({ noteStates, setNoteStates, activeNote }) => {
  
    return (
        <div className="Notes">
            {noteStates.map((isActive, index) => 
                <Note 
                    key={index}
                    isActive={isActive}
                    isPlayed={index === activeNote}
                    onClick={() => {
                        const newNoteStates = [...noteStates];
                        newNoteStates[index] = !isActive;
                        setNoteStates(newNoteStates);
                    }}           
                />
            )}
        </div>
    );
}

export default Notes;