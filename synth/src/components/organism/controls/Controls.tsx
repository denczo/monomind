import React from "react";
import "./Controls.css"
import Section from "../../atoms/section/Section.tsx";
import ADSR from "../../molecules/adsr/ADSR.tsx";
import Osc from "../../molecules/oscillator/Osc.tsx";
import Lfo from "../../molecules/oscillator/Lfo.tsx";
import Filter from "../../molecules/filter/Filter.tsx";
import SpeedCtrl from "../../molecules/sequencer/SpeedCtrl.tsx";

const Controls = () => {

    return (<div className="Controls">
        {/* <WfSelector oscId={OscId.OSC1} /> */}
        <Section name={"ENVELOPE"} children={<ADSR/>}/>
        <Section name={"OSC"} children={<Osc/>}/>
        <Section name={"LFO"} children={<Lfo/>}/>
        <Section name={"FILTER"} children={<Filter />}/>
        <Section name={"SEQ"} children={<SpeedCtrl />}/>
        {/* <Section name={"REVERB"} children={null} /> */}
    </div>);
}

export default Controls;