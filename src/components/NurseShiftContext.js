import React, { useState, useContext, useEffect, createContext } from 'react';
import ShiftSchedule from "./ShiftSchedule";

const AppContext = createContext();

function AppProvider({ children }) {
    const [shifts, setShifts] = useState([]);
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        fetchShifts();
        fetchNurses();
    }, []);

    function fetchShifts() {
        return fetch('http://localhost:9001/shifts')
            .then(response => {
                if (response.ok) return response.json()
                else throw new Error;
            })
            .then(shiftsArr => {
                setShifts([...shifts, ...shiftsArr]);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function fetchNurses() {
        return fetch('http://localhost:9001/nurses')
            .then(response => {
                if (response.ok) return response.json()
                else throw new Error;
            })
            .then(nursesArr => {
                setNurses([...nurses, ...nursesArr]);
            })
            .catch(err => {
                console.error(err);
            })
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

