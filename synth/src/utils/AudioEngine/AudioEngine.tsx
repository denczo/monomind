export default class AudioEngine{

    private static instance: AudioEngine | null = null;
    actx: AudioContext;
    waveform: string;

    private constructor(){
        window.addEventListener('click', this.initializeAudioContext);
        console.log("Initialized")
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
            const oscEnv = new GainNode(this.actx, osc);
            oscEnv.gain.cancelScheduledValues(currentTime);
            oscEnv.gain.setValueAtTime(0, currentTime);
            oscEnv.gain.linearRampToValueAtTime(1, currentTime + attackTime);
            oscEnv.gain.linearRampToValueAtTime(0, currentTime + oscLength - releaseTime);
            osc.connect(oscEnv).connect(this.actx.destination);
            osc.start(currentTime);
            osc.stop(currentTime + oscLength)
        }
    }

    public setWaveform(waveform: string): void{
        this.waveform = waveform;
    }

    private isValidNumber(number: number): boolean{
        if(isFinite(number) && !isNaN(number)){
            return true;
        }else{
            return false;
        }
    }
}