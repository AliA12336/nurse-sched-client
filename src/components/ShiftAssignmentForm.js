import React, {useEffect, useRef, useState} from "react";
import Shift from "./Shift";
import {useGlobalContext} from "./NurseShiftContext";
import {NurseOption, ShiftOption} from "./ShiftScheduleOptions";

function ShiftAssignmentForm() {
    const {shifts, nurses} = useGlobalContext();
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [shiftSelected, setShiftSelected] = useState("");
    const [nurseSelected, setNurseSelected] = useState("");

    //resets shift and nurse selected and closes the form
    function handleSubmit(e) {
        e.preventDefault();
        setShiftSelected("");
        setNurseSelected("");
        setIsComponentVisible(false);
        console.log(e.target);
    }

    function handleShiftChange(e) {
        setShiftSelected(e.target.value);
    }

    function handleNurseChange(e) {
        setNurseSelected(e.target.value);
    }

    //conditionally renders the shift assignment form using custom function
    return (
        <div>
            <button onClick={() => setIsComponentVisible(!isComponentVisible)}>
                Set Shift Assignment
            </button>
            <div ref={ref}>
                {isComponentVisible && (
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <header>Set Shift Assignment</header>
                        <select id="shift" value={shiftSelected} onChange={(e) => handleShiftChange(e)}>
                            <option/>
                            {shifts.map((shiftProps) => (
                                <ShiftOption key={shiftProps.id} shiftProps={shiftProps}/>
                            ))}
                        </select>
                        <select id="nurse" value={nurseSelected} onChange={(e) => handleNurseChange(e)}>
                            <option/>
                            {nurses.map((nurseProps) => (
                                <NurseOption key={nurseProps.id} nurseProps={nurseProps}/>
                            ))}
                        </select>
                        <button type="submit" disabled={!shiftSelected}>Save Assignment</button>
                    </form>)}
            </div>
        </div>
    );
}


//helper function to change visibility of a component
function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };
    return {ref, isComponentVisible, setIsComponentVisible};
}


export default ShiftAssignmentForm;
