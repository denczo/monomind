import './Waveform.css';


const Waveform = ({waveform, label}) => {

    return (
        <div className="Waveform">
            <input type="radio" name="waveform" value="Sine" id="sine" checked={label === "Sine"} onChange={(e) => waveform(e.target.value)} />
            <label htmlFor="regular">Sine</label>

            <input type="radio" name="waveform" value="Triangle" id="triangle" checked={label === "Triangle"} onChange={(e) => waveform(e.target.value)}/>
            <label htmlFor="medium">Triangle</label>

            <input type="radio" name="waveform" value="Sawtooth" id="saw" checked={label === "Sawtooth"} onChange={(e) => waveform(e.target.value)}/>
            <label htmlFor="large">Saw</label>

            <input type="radio" name="waveform" value="Square" id="square" checked={label === "Square"} onChange={(e) => waveform(e.target.value)}/>
            <label htmlFor="large">Square</label>
        </div>
    );
}

export default Waveform;