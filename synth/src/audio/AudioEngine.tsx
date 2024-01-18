import { AdsrParams, OscId, OscParams } from "../types/audio.d.tsx";

export class AudioEngine {

    private static instance: AudioEngine | null = null;
    actx: AudioContext;
    lfoWf: string;

    freqLp: number;
    oscParams: Record<OscId, OscParams>;
    oscillators: Record<OscId, OscillatorNode>;
    adsrParams: AdsrParams;

    analyser: AnalyserNode;
    bufferLength: number;
    dataArray: Uint8Array;
    oscStack: OscillatorNode[];
    gainStack: GainNode[];


    private constructor() {
        // AudioContext requires a click event to be initialized
        window.addEventListener('click', this.initializeAudioContext);
        console.log("Initialized")
        this.freqLp = 500;
        this.oscStack = [];
        this.gainStack = [];
        this.adsrParams = { value: 0.5, attack: 0.25, decay: 0.25, sustain: 0.5, release: 0.5 }
        this.oscParams = {
            [OscId.OSC]: { type: 'triangle' as OscillatorType, frequency: 0, gain: 0.2 },
            [OscId.LFO]: { type: 'triangle' as OscillatorType, frequency: 0, gain: 0.2 }
        };
    }

    private initializeAudioContext = () => {
        if (!this.actx) {
            this.actx = new AudioContext();
            this.initAnalyzer();
            window.removeEventListener('click', this.initializeAudioContext);
        }
    };

    private initAnalyzer(): void {
        this.analyser = this.actx.createAnalyser();
        this.analyser.fftSize = 2048;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyser.getByteTimeDomainData(this.dataArray);
    }

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

    public setFreqLp(freq: number): void {
        this.freqLp = freq;
    }

    private initOscillator(actx: AudioContext, oscParams: OscParams): OscillatorNode {
        const osc = actx.createOscillator();
        osc.type = oscParams.type;
        osc.frequency.value = oscParams.frequency;
        return osc;
    }

    private initGainNode(actx: AudioContext, gain: number, osc: OscillatorNode): GainNode {
        const gainNode = new GainNode(actx, osc);
        gainNode.gain.value = gain;
        return gainNode;
    }

    public setOscParams(oscId: OscId, oscParams: OscParams): void {
        const { frequency, type, gain } = oscParams;
        if (this.isValidNumber(frequency) && this.isValidNumber(gain)) {
            this.oscParams[oscId].frequency = frequency;
            this.oscParams[oscId].type = type;
            this.oscParams[oscId].gain = gain;
        }
    }

    public setAdsr(params: AdsrParams): void {
        this.adsrParams = params;
    }


    // sets parameters for either a filter adsr @filter.frequency or a gain adsr @gain.gain
    private setAdsParams(audioParam: AudioParam, params: AdsrParams): void {
        const currentTime = this.actx.currentTime;
        this.adsrParams = params;
        audioParam.cancelScheduledValues(currentTime);
        audioParam.setValueAtTime(0.1, currentTime);
        audioParam.linearRampToValueAtTime(this.oscParams[OscId.OSC].gain, currentTime + params.attack);
        audioParam.setTargetAtTime(params.sustain * this.oscParams[OscId.OSC].gain, currentTime + params.attack, params.decay);
    }

    private setReleaseParam(audioParam: AudioParam, params: AdsrParams): void{
        const currentTime = this.actx.currentTime;
        audioParam.linearRampToValueAtTime(0, currentTime + params.release);
    }

    private stopOsc(release: number): void{
        const currentTime = this.actx.currentTime;
        const osc = this.oscStack.pop();
        if(osc){
            osc.stop(currentTime + release)
        }
    }

    public onReleaseAudio(adsrParams: AdsrParams): void{
        const osc = this.oscStack.pop();
        const gain = this.gainStack.pop();
        if(osc && gain){
            const currentTime = this.actx.currentTime;
            gain.gain.linearRampToValueAtTime(0, currentTime + adsrParams.release);
            osc.stop(currentTime + adsrParams.release)
        }
    }

    public onEnterAudio(adsrParams: AdsrParams): void{
        const { attack, decay, sustain, release } = adsrParams;

        if (this.actx && this.isValidNumber(attack) && this.isValidNumber(decay) && this.isValidNumber(sustain) && this.isValidNumber(release)) {
            const currentTime = this.actx.currentTime;

            const osc = this.initOscillator(this.actx, this.oscParams[OscId.OSC]);
            const oscGain = this.initGainNode(this.actx, this.oscParams[OscId.OSC].gain, osc);
            osc.connect(this.analyser);

            this.oscStack.push(osc);
            this.gainStack.push(oscGain);
            const lfo = this.initOscillator(this.actx, this.oscParams[OscId.LFO]);
            const lfoGain = this.initGainNode(this.actx, this.oscParams[OscId.LFO].gain, lfo);

            const filter = this.actx.createBiquadFilter();
            filter.type = 'lowpass';
            
            if(true){
                // setup for vibrato effect, gadsr
                this.setAdsParams(oscGain.gain, this.adsrParams)
                filter.frequency.value = this.freqLp
                lfo.connect(lfoGain);  
                lfoGain.connect(osc.frequency);
            }else{
                // setup for vibrato effect, fadsr
                this.setAdsParams(filter.frequency, this.adsrParams);
                // filter.connect(osc.frequency)
                // lfoGain.fgain.value = 1000;
                // filter.frequency.value = this.freqLp
                console.log(filter.Q, filter.frequency)
                // filter.frequency.vadlue = 1000;

                lfo.connect(lfoGain);  
                lfoGain.connect(osc.frequency);
            }

            osc.connect(oscGain).connect(filter).connect(this.actx.destination);
            lfo.start();
            osc.start(currentTime);
        }
    }
}