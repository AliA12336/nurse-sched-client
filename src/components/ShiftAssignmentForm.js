import React, {useEffect, useRef, useState} from "react";
import {useGlobalContext} from "./NurseShiftContext";
import {NurseOption, ShiftOption} from "./ShiftScheduleOptions";

function ShiftAssignmentForm() {
    const { shifts, nurses, saveShiftAssignment, isScheduleConflict, isNurseQualified } = useGlobalContext();
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [shiftSelected, setShiftSelected] = useState("");
    const [nurseSelected, setNurseSelected] = useState("");

    //resets shift and nurse selected and closes the form
    function handleSubmit(e) {
        e.preventDefault();

        const shiftOptions = e.target[0];
        const nurseOptions = e.target[1];
        let shiftSelectedId;
        let nurseSelectedId;

        for(let option of shiftOptions) {
            //shiftId is 1 off from shift option selected because indexing starts at 0
            if(option.selected) shiftSelectedId = parseInt(option.value) - 1;
        }

        for(let option of nurseOptions) {
            if(option.selected) nurseSelectedId = parseInt(option.value);
        }

        if(isScheduleConflict(shifts[shiftSelectedId].start, shifts[shiftSelectedId].end, nurseSelectedId)) {
            alert("Error: This nurse is already working during the chosen shift.")
        }
        else if(!isNurseQualified(nurses[nurseSelectedId - 1].qualification, shifts[shiftSelectedId].qual_required)) {
            alert("Error: This nurse isn't qualified to work the chosen shift." +
                "\n\nA CNA can only work CNA shifts.\n" +
                "An LPN can work CNA or LPN shifts.\n" +
                "An RN can work CNA, LPN, or RN shifts")
        }
        else {
            saveShiftAssignment(shiftSelectedId, nurseSelectedId);
        }

        setShiftSelected("");
        setNurseSelected("");
        setIsComponentVisible(false);
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
