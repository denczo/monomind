let audioCtx = new AudioContext();
let osc = null;
let filter = null;
let node = null;
let gain = null;

function gainNode(node, ctx){
    let gain = ctx.createGain();
    gain.gain.value = 0.5;
    node.connect(gain);
    return gain;
}

function lowPassNode(node, ctx){
    let filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'
    node.connect(filter);
    return filter;
}


export function noteRelease(){
    const t_released = audioCtx.currentTime;
    const timeScale = 2;
    const releaseDuration = 0.8 * timeScale;

    gain.gain.cancelScheduledValues(t_released);
    gain.gain.setValueAtTime(gain.gain.value, t_released);
    gain.gain.linearRampToValueAtTime(0, t_released + releaseDuration);
    osc.stop(t_released + releaseDuration);
}

export function init(wf){
    osc = audioCtx.createOscillator();
    osc.type = wf.toLowerCase();
    osc.start(audioCtx.currentTime);
    gain = gainNode(osc, audioCtx);
    filter = lowPassNode(gain, audioCtx);
    filter.connect(audioCtx.destination);
    node = filter;
}

export function notePress(wf){
    init(wf);
}

export function setFreqFilter(value){
    if(filter)
        filter.frequency.value = value;
}

export function setFreqOsc(value){
    if(osc)
        osc.frequency.value = value;
}