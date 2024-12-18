import React, { useEffect } from "react";
import Slider from "../../atoms/slider/Slider.tsx";
import { useGlobalContext } from "../../../contexts/GlobalContext.tsx";
import { Scheduler } from "../../../audio/Scheduler.tsx";

const SpeedCtrl = () => {

    const { bpm, setBpm } = useGlobalContext();
    const scheduler = Scheduler.getInstance();

    useEffect(() => {
        scheduler.setTempo(bpm);
    }, [bpm, scheduler])

    return (
        <Slider name={"Bpm"} value={bpm} max={400} updateValue={(e) => setBpm(parseFloat(e.target.value))} />
   );
}

export default SpeedCtrl;