import React, {useState, useContext, useEffect, createContext} from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
    const [shifts, setShifts] = useState([]);
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        setShifts(fetchShifts());
        setNurses(fetchNurses());
    }, []);

    async function fetchShifts() {
        try {
            const response = await fetch('http://localhost:9001/shifts');
            const shiftsArr = await response.json();
            console.log(shiftsArr);
            return [...shifts, shiftsArr];
        }
        catch(err) {
            console.error(err);
        }
    }

    async function fetchNurses() {
        return ['nurses'];
    }

    return (
        <AppContext.Provider
            value = {{ shifts, nurses }}>
            {children}
        </AppContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(AppContext);
}

export { AppContext, AppProvider }

