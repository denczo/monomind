import React from 'react';
import './Slider.css';

const Slider = ({name, value, updateValue, min = 0, max = 1, step = 0.05}) => {

    return (<div className="Slider">
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
                <label>{name}</label>

    </div>
    );
};

export default Slider;