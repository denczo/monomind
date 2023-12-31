import React, { useEffect } from "react";
import WfSelector from "../../molecules/wfselector/WfSelector.tsx";
import Slider from "../../atoms/slider/Slider.tsx";
import { AudioEngine } from "../../../audio/AudioEngine.tsx";
import { useGlobalContext } from "../../../contexts/GlobalContext.tsx";
import { Scheduler } from "../../../audio/Scheduler.tsx";
import "./Controls.css"

const Controls = () => {

    const { bpm, setBpm, freqLp, setFreqLp, gain, setGain } = useGlobalContext();
    const scheduler = Scheduler.getInstance();

    useEffect(() => {
        scheduler.setTempo(bpm);
        AudioEngine.getInstance().setFreqLp(freqLp);
        AudioEngine.getInstance().setGain(gain);
    }, [bpm, freqLp, gain, scheduler])

    return (<div className="Controls">
        <WfSelector />
        <Slider name={"BPM " + scheduler.tempo} value={bpm} max={200} updateValue={(e) => setBpm(parseFloat(e.target.value))} />
        <Slider name={"LP " + AudioEngine.getInstance().freqLp} value={freqLp} max={2000} updateValue={(e) => setFreqLp(parseFloat(e.target.value))} />
        <Slider name={"Gain " + AudioEngine.getInstance().gain} value={gain} updateValue={(e) => setGain(parseFloat(e.target.value))} />
    </div>);
}

export default Controls;