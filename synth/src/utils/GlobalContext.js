import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }){
    const [attack, setAttack] = useState(0.25);
    const [decay, setDecay] = useState(0.75);
    const [sustain, setSustain] = useState(0.5);
    const [release, setRelease] = useState(0.5);

    const updateAttack = (value) => setAttack(value);
    const updateDecay = (value) => setDecay(value);
    const updateSustain = (value) => setSustain(value);
    const updateRelease = (value) => setRelease(value);

    return (
        <GlobalContext.Provider value={{
            attack,
            decay,
            sustain,
            release,
            updateAttack,
            updateDecay,
            updateSustain,
            updateRelease,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useGlobalContext(){
    return useContext(GlobalContext);
}