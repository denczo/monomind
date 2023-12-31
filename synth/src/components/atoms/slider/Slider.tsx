import React from 'react';
import './Slider.css';

const Slider = ({name, value, updateValue, min = 0, max = 1, step = 0.05}) => {

    return (<div className="Slider">
        <label>{name}</label>
        <input
            className="Range"
            id={name.toString().toLowerCase()}
            type="range"
            min={min}
            max={max}
            value={value}
            // onWheel={(e) => updateValue(e.deltaY)}
            onChange={updateValue}
            step={step} />
    </div>
    );
};

export default Slider;