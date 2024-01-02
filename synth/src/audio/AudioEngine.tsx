import { AdsrParams, OscId, OscParams } from "../types/audio.d.tsx";

export class AudioEngine {

    private static instance: AudioEngine | null = null;
    actx: AudioContext;
    waveform: string;
    freqLp: number;
    gain: number;
    oscParams: Record<OscId, OscParams>;
    oscillators: Record<OscId, OscillatorNode>;
    adsrParams: AdsrParams;

    private constructor() {
        // AudioContext requires a click event to be initialized
        window.addEventListener('click', this.initializeAudioContext);
        console.log("Initialized")
        this.freqLp = 500;
        this.gain = 0.2;
        this.adsrParams = {value: 0.5, attack: 0.25, decay: 0.25, sustain: 0.5, release: 0.5}
        this.oscParams = {[OscId.OSC1]:{type: 'triangle' as OscillatorType, frequency: 0},
        [OscId.OSC2]:{type: 'triangle' as OscillatorType, frequency: 0},
        [OscId.LFO]:{type: 'triangle' as OscillatorType, frequency: 0}};
    }

    private initializeAudioContext = () => {
        if (!this.actx) {
            this.actx = new AudioContext();
            window.removeEventListener('click', this.initializeAudioContext);
        }
    };

    private isValidNumber(number: number): boolean {
        if (isFinite(number) && !isNaN(number)) {
            return true;
        } else {
            return false;
        }
    }

    // AudioEngine will be created as Singleton
    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }

        return AudioEngine.instance;
    }

    public setWaveform(waveform: string): void {
        this.waveform = waveform;
    }

    public setFreqLp(freq: number): void {
        this.freqLp = freq;
    }

    public setGain(gain: number): void {
        this.gain = gain;
    }

    private initOscillator(oscParams: OscParams): OscillatorNode {
        const osc = this.actx.createOscillator();
        osc.type = oscParams.type;
        osc.frequency.value = oscParams.frequency;
        return osc;
    }

    public setOscParams(oscId: OscId, freq: number, type: OscillatorType): void {
        console.log("SET OSC", freq, oscId)
        this.oscParams[oscId].frequency = freq;
        this.oscParams[oscId].type = type;
    }

    // sets parameters for either a filter adsr @filter.frequency or a gain adsr @gain.gain
    private setAdsrParams(audioParam: AudioParam, params: AdsrParams): void {
        const currentTime = this.actx.currentTime;
        this.adsrParams = this.adsrParams;
        audioParam.cancelScheduledValues(currentTime);
        audioParam.setValueAtTime(0, currentTime);
        audioParam.linearRampToValueAtTime(params.value, currentTime + params.attack);
        audioParam.linearRampToValueAtTime(0, currentTime + params.sustain - params.release)
    }

    // osc-fadsr-lfo-gain-dest
    private setLfoPitchChain(adsrParams: AdsrParams): void {

        const { attack, decay, sustain, release } = adsrParams;

        if(this.actx && this.isValidNumber(attack) && this.isValidNumber(decay) && this.isValidNumber(sustain) && this.isValidNumber(release) ){
            const currentTime = this.actx.currentTime;
            const osc = this.initOscillator(this.oscParams[OscId.OSC1]);

            const lfo = this.initOscillator(this.oscParams[OscId.LFO]);
            lfo.frequency.value = 5;
            const lfoGain = new GainNode(this.actx, lfo);
            lfoGain.gain.value = 4;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);

            const filter = this.actx.createBiquadFilter();
            filter.type = 'lowpass';
            this.setAdsrParams(filter.frequency, { value: this.freqLp, attack: attack, decay: decay, sustain: sustain, release: release })

            osc.connect(filter).connect(this.actx.destination);
            osc.start(currentTime);
            lfo.start();
            osc.stop(currentTime + sustain)
        }
    };

    // osc-gadsr-lfo-filter-dest
    private setLfoFilterchain(): void{};

    public setAudioChain(lfo: boolean, adsrParams: AdsrParams): void{
        if(lfo){
            this.setLfoFilterchain();
        }else{
            this.setLfoPitchChain(adsrParams);
        }
    }
    

    // public playNote(attackTime: number, oscLength: number, releaseTime: number, freq: number): void {

    //     if (this.actx && this.isValidNumber(attackTime) && this.isValidNumber(oscLength) && this.isValidNumber(releaseTime)) {
    //         const currentTime = this.actx.currentTime;
    //         const osc = this.initOscillator(this.actx, this.waveform as OscillatorType, freq)
    //         const lfo = this.initOscillator(this.actx, 'triangle' as OscillatorType, 2);
    //         const lfoGain = new GainNode(this.actx, lfo);
    //         lfoGain.gain.value = 1
    //         // lfo.connect(lfoGain);

    //         const filter = this.actx.createBiquadFilter();
    //         filter.type = 'lowpass';
    //         // filter.frequency.value = this.freqLp;
    //         this.setAdsrParams(filter.frequency, { value: this.freqLp, attack: attackTime, decay: 0, sustain: oscLength, release: releaseTime })

    //         // lfoGain.connect(filter.frequency);
    //         // lfo.start();
    //         const adsr = new GainNode(this.actx, osc);
    //         this.setAdsrParams(adsr.gain, { value: this.gain, attack: attackTime, decay: 0, sustain: oscLength, release: releaseTime })
    //         // adsr.connect(filter.gain);

    //         osc.connect(filter).connect(this.actx.destination);
    //         osc.start(currentTime);
    //         osc.stop(currentTime + oscLength)
    //     }
    // }
}