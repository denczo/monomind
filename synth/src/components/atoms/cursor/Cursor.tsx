import useMousePos from '../../../utils/MousePosHook';
import './Cursor.css';

const Cursor = () => {

    const mousePos = useMousePos();

    return (
        <div className="Cursor" style={{top: mousePos.y - 35, left: mousePos.x - 35}}></div>
    );
}

export default Cursor;
