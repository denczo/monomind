import React, { useEffect } from "react";
import { AudioEngine } from "../../../../audio/AudioEngine.tsx";
import { useGlobalContext } from "../../../../contexts/GlobalContext.tsx";
import Slider from "../../../atoms/slider/Slider.tsx";

const Reverb = () => {

    const { freqLp, setFreqLp } = useGlobalContext();

    useEffect(() => {
        AudioEngine.getInstance().setFreqLp(freqLp);
    }, [freqLp])

    return (<>
        <Slider name={"Depth"} value={freqLp} max={2000} updateValue={(e) => setFreqLp(parseFloat(e.target.value))} />
        <Slider name={"Amt"} value={freqLp} max={2000} updateValue={(e) => setFreqLp(parseFloat(e.target.value))} />
    </>
    );
}

export default Reverb;