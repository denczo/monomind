import React, { useEffect } from "react";
import Slider from "../../atoms/slider/Slider.tsx";
import { AudioEngine } from "../../../audio/AudioEngine.tsx";
import { useGlobalContext } from "../../../contexts/GlobalContext.tsx";

const Filter = () => {

    const { freqLp, setFreqLp } = useGlobalContext();

    useEffect(() => {
        AudioEngine.getInstance().setFreqLp(freqLp);
    }, [freqLp])

    return (
        <Slider name={"Cutoff"} value={freqLp} max={2000} updateValue={(e) => setFreqLp(parseFloat(e.target.value))} />
   );
}

export default Filter;