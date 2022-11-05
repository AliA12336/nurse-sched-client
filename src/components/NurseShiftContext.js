import React, {useState, useContext, useEffect, createContext} from 'react';

const AppContext = createContext();

function AppProvider({children}) {
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
            body: JSON.stringify({nurseID: nurseId})
        })
            .then(response => {
                if (response.ok) return response.json();
                else throw new Error();
            })
            .then(() => {
                const shiftsCopy = structuredClone(shifts);
                shiftsCopy[shiftId].nurse_id = nurseId;
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
        for (let nurse of nurses) {
            if (nurse.id === nurse_id) {
                return nurse.first_name + " " + nurse.last_name + ", " + nurse.qualification;
            }
        }
        return "";
    }

    function isScheduleConflict(startTime, endTime, nurseId) {
        const timeSegments = [[startTime, endTime]];

        //push all the nurse's shifts to a time segments array
        for(let shift of shifts) {
            if(shift.nurse_id === nurseId) timeSegments.push([shift.start, shift.end])
        }

        //if nurse has no other shifts no schedule conflict
        if(timeSegments.length < 2) return false;
        console.log(timeSegments);

        /*
        check if end_time of the current timeSegment is greater than start_time of the next one.
        If that happens, there is an overlap.
        */
        timeSegments.sort((timeSegment1, timeSegment2) =>
            timeSegment1[0].localeCompare(timeSegment2[0])
        );

        for (let i = 0; i < timeSegments.length - 1; i++) {
            const currentEndTime = timeSegments[i][1];
            const nextStartTime = timeSegments[i + 1][0];

            if (currentEndTime > nextStartTime) {
                return true;
            }
        }

        return false;
    }

    function isNurseQualified(nurseQual, shiftQual) {
        switch(nurseQual) {
            case "CNA":
                if(shiftQual === "CNA") return true;
                break;
            case "LPN":
                if(shiftQual === "LPN" || shiftQual === "CNA") return true;
                break;
            case "RN":
                if(shiftQual === "LPN" || shiftQual === "CNA" || shiftQual === "RN") return true;
                break;
            default:
                break;
        }
        return false;
    }

    return (
        <AppContext.Provider
            value={{
                shifts,
                nurses,
                formatDate,
                formatNurseName,
                saveShiftAssignment,
                isScheduleConflict,
                isNurseQualified
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(AppContext);
}

export {AppContext, AppProvider}

