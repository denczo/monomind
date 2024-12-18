import React from 'react';
import './Section.css';

const Section = ({name, children}) => {
    return (
        <fieldset className="Section">
        <legend><b>{name}</b></legend>
            {children}
        </fieldset>
    );
}

export default Section;