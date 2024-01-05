import React, { useEffect, useRef } from 'react';
import { AudioEngine } from '../../../audio/AudioEngine.tsx';
import './Visualizer.css';

const Visualizer = () => {

    const audioEngine = AudioEngine.getInstance();

    const canvasRef = useRef<HTMLCanvasElement>(null);
  

    const draw = (canvas, canvasCtx) => {
        requestAnimationFrame(() => draw(canvas, canvasCtx));

        const analyser = audioEngine.analyser;
        analyser?.getByteTimeDomainData(audioEngine.dataArray);
      
        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        
        canvasCtx.lineWidth = 1;
        canvasCtx.strokeStyle = "rgb(255, 255, 255)";
      
        canvasCtx.beginPath();
      
        const sliceWidth = (canvas.width * 1.0) / audioEngine.bufferLength;
        let x = 0;
      
        for (let i = 0; i < audioEngine.bufferLength; i++) {
          const v = audioEngine.dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;
      
          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
      
          x += sliceWidth;
        }
      
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      }


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
    
        if (!context) {
          return;
        }
    
        draw(canvas, context)
    }, [])

    return (
        <canvas id='Osc' ref={canvasRef} width={400} height={70} />
    );
};

export default Visualizer;