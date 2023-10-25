import Slider from '../slider/Slider';
import './ADSR.css';

const ADSR = () => {

    return (<div className='ADSR'>
      <Slider name={"Attack"}/>
      <Slider name={"Delay"}/>
      <Slider name={"Sustain"}/>
      <Slider name={"Release"}/>
    </div>
    );
};

export default ADSR;