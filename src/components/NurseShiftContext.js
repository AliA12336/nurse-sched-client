import React, { useState, useContext, useEffect, createContext } from 'react';
import shift from "./Shift";

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
                else throw new Error();
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
                else throw new Error();
            })
            .then(nursesArr => {
                setNurses([...nurses, ...nursesArr]);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function saveShiftAssignment(shiftId, nurseId) {
        return fetch('http://localhost:9001/shifts/' + shiftId, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nurseID : nurseId})
        })
            .then(response => {
                if(response.ok) return response.json();
                else throw new Error();
            })
            .then(nursesArr => {
                const shiftsCopy = structuredClone(shifts);
                shiftsCopy[parseInt(shiftId) - 1].nurse_id =  parseInt(nurseId);
                setShifts(shiftsCopy);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function formatDate(utcDate, needShiftTime) {
        const date = new Date(utcDate);
        const formattedDate = needShiftTime ? date.toLocaleTimeString() : date.toLocaleString();
        return formattedDate;
    }

    function formatNurseName(nurse_id) {
        for(let nurse of nurses) {
            if(nurse.id === nurse_id) {
                return nurse.first_name + " " + nurse.last_name + ", " + nurse.qualification;
            }
        }
        return "";
    }

    return (
        <AppContext.Provider
            value = {{ shifts, nurses, formatDate, formatNurseName, saveShiftAssignment }}>
            {children}
        </AppContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(AppContext);
}

export { AppContext, AppProvider }

