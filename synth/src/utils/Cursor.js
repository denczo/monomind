import useMousePos from './MousePosHook';
import './Cursor.css';

const Cursor = () => {

    const mousePos = useMousePos();

    return (
        <div className="Cursor" style={{top: mousePos.y - 150, left: mousePos.x - 150}}></div>
    );
}

export default Cursor;
