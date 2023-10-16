let audioCtx = new AudioContext();
let osc = null;

export function startOsc(freq){
    osc = audioCtx.createOscillator();
    // float number has to be finite or it causes an error
    if(isFinite(freq))
        osc.frequency.value = parseFloat(freq);
    osc.start(audioCtx.currentTime);
    osc.connect(audioCtx.destination)
}

export function stopOsc(){
    osc.stop(audioCtx.currentTime);
    osc.disconnect(audioCtx.destination);
    osc = null;
}

export function setFreqOsc(value){
    if(osc)
        osc.frequency.value = value;
}