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


export function noteRelease(releaseTime){
    const t_released = audioCtx.currentTime;
    const timeScale = 2;
    const releaseDuration = releaseTime * timeScale;

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

export function notePress(wf, attackTime, decayTime, sustainTime){

    init(wf)
    const t_pressed = audioCtx.currentTime;
    const attack_duration = attackTime;
    const sustainLevel = sustainTime;
    const decayDuration = decayTime;

    gain.gain.setValueAtTime(0, t_pressed)
    gain.gain.linearRampToValueAtTime(1, t_pressed + attack_duration);
    gain.gain.setTargetAtTime(sustainLevel, t_pressed + attack_duration, decayDuration);
}

export function setFreqFilter(value){
    if(filter)
        filter.frequency.value = value;
}

export function setFreqOsc(value){
    if(osc)
        osc.frequency.value = value;
}