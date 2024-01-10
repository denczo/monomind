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

    private constructor() {
        // AudioContext requires a click event to be initialized
        window.addEventListener('click', this.initializeAudioContext);
        console.log("Initialized")
        this.freqLp = 500;
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
    private setAdsrParams(audioParam: AudioParam, params: AdsrParams): void {
        const currentTime = this.actx.currentTime;
        this.adsrParams = params;
        audioParam.cancelScheduledValues(currentTime);
        audioParam.setValueAtTime(0.1, currentTime);
        audioParam.linearRampToValueAtTime(params.value, currentTime + params.attack);
        // console.log(params.sustain + params.release)
        audioParam.linearRampToValueAtTime(0, currentTime + params.sustain + params.release)
    }

    // osc-fadsr-lfo-gain-dest
    private setLfoPitchChain(adsrParams: AdsrParams): void {

        const { attack, decay, sustain, release } = adsrParams;


        if (this.actx && this.isValidNumber(attack) && this.isValidNumber(decay) && this.isValidNumber(sustain) && this.isValidNumber(release)) {
            const currentTime = this.actx.currentTime;

            const osc = this.initOscillator(this.actx, this.oscParams[OscId.OSC]);
            const oscGain = this.initGainNode(this.actx, this.oscParams[OscId.OSC].gain, osc);

            const lfo = this.initOscillator(this.actx, this.oscParams[OscId.LFO]);
            const lfoGain = this.initGainNode(this.actx, this.oscParams[OscId.LFO].gain, lfo);

            // lfo.connect(lfoGain);
            // lfoGain.connect(osc.frequency);
            // lfoGain.connect(lfo.frequency);

            const filter = this.actx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = this.freqLp
            // lfo.connect(filter.frequency);

            lfo.connect(oscGain.gain);
            this.setAdsrParams(oscGain.gain, { value: this.oscParams[OscId.OSC].gain, attack: attack, decay: decay, sustain: sustain, release: release })
            osc.connect(oscGain).connect(filter).connect(this.actx.destination);
            // lfo.connect(filter.gain);
            // console.log(lfo.frequency.value)


            osc.connect(this.analyser);
            osc.start(currentTime);
            lfo.start();
            // console.log(lfo.frequency.value, lfoGain.gain.value, oscGain.gain.value)

            osc.stop(currentTime + sustain)
        }
    };

    // osc-gadsr-lfo-filter-dest
    private setLfoFilterchain(adsrParams: AdsrParams): void {
        const { attack, decay, sustain, release } = adsrParams;

        if (this.actx && this.isValidNumber(attack) && this.isValidNumber(decay) && this.isValidNumber(sustain) && this.isValidNumber(release)) {
            const currentTime = this.actx.currentTime;

            const osc = this.initOscillator(this.actx, this.oscParams[OscId.OSC]);
            const oscGain = this.initGainNode(this.actx, this.oscParams[OscId.OSC].gain, osc);

            const lfo = this.initOscillator(this.actx, this.oscParams[OscId.LFO]);
            const lfoGain = this.initGainNode(this.actx, this.oscParams[OscId.LFO].gain, lfo);

            const filter = this.actx.createBiquadFilter();
            filter.type = 'lowpass';

            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);

            this.setAdsrParams(filter.frequency, { value: this.freqLp, attack: attack, decay: decay, sustain: sustain, release: release })

            osc.connect(oscGain).connect(filter).connect(this.actx.destination);
            osc.connect(this.analyser);
            osc.start(currentTime);
            lfo.start();
            osc.stop(currentTime + sustain)
        }
    };

    public setAudioChain(lfo: boolean, adsrParams: AdsrParams): void {
        if (lfo) {
            this.setLfoPitchChain(adsrParams);
        } else {
            this.setLfoPitchChain(adsrParams);
        }
    }
}