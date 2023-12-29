export default class AudioEngine{

    private static instance: AudioEngine | null = null;
    actx: AudioContext;
    waveform: string;
    freqLp: number;
    gain: number;

    private constructor(){
        window.addEventListener('click', this.initializeAudioContext);
        console.log("Initialized")
        this.freqLp = 500;
        this.gain = 0.2;
    }

    public static getInstance(): AudioEngine{
        if(!AudioEngine.instance){
            AudioEngine.instance = new AudioEngine();
        }

        return AudioEngine.instance;
    }

    private initializeAudioContext = () => {
        if (!this.actx) {
          this.actx = new AudioContext();
          window.removeEventListener('click', this.initializeAudioContext);
        }
      };
 
    public playNote(attackTime: number, oscLength: number, releaseTime: number, freq: number): void{
        
        if(this.actx && this.isValidNumber(attackTime) && this.isValidNumber(oscLength) && this.isValidNumber(releaseTime)){
            const currentTime = this.actx.currentTime;
            const osc = this.actx.createOscillator();
            osc.type = this.waveform as OscillatorType;
            osc.frequency.value = freq;

            const lfo = this.actx.createOscillator();
            lfo.type = 'triangle';
            lfo.frequency.value = 2;
            const lfoGain = new GainNode(this.actx, lfo);
            lfoGain.gain.value = 300
            lfo.connect(lfoGain);

            const filter = this.actx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = this.freqLp;

            lfoGain.connect(filter.frequency);
            lfo.start();

            const oscEnv = new GainNode(this.actx, osc);
            oscEnv.gain.cancelScheduledValues(currentTime);
            oscEnv.gain.setValueAtTime(0, currentTime);
            oscEnv.gain.linearRampToValueAtTime(this.gain, currentTime + attackTime);
            oscEnv.gain.linearRampToValueAtTime(0, currentTime + oscLength - releaseTime);
            osc.connect(filter).connect(oscEnv).connect(this.actx.destination);
            osc.start(currentTime);
            osc.stop(currentTime + oscLength)
        }
    }

    public setWaveform(waveform: string): void{
        this.waveform = waveform;
    }

    public setFreqLp(freq: number): void{
        this.freqLp = freq;
    }

    private isValidNumber(number: number): boolean{
        if(isFinite(number) && !isNaN(number)){
            return true;
        }else{
            return false;
        }
    }
}