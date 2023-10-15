let audioCtx = new AudioContext();
let myOscillator = audioCtx.createOscillator();
myOscillator.frequency.value = 440;
myOscillator.connect(audioCtx.destination);

export default myOscillator;