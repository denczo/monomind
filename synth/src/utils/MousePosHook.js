import { useState, useEffect } from 'react';

const useMousePos = () => {

    const [mousePos, setMousePos] = useState({ x: null, y: null });

    useEffect(() => {
        const updateMousePos = e => {
            setMousePos({ x: e.clientX, y: e.clientY })
        };
        window.addEventListener('mousemove', updateMousePos);

        return () => {
            window.removeEventListener('mousemove', updateMousePos);
        };
    }, [])

    return mousePos;

}

export default useMousePos;
