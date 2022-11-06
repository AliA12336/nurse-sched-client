import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "./NurseShiftContext";
import { NurseOption, ShiftOption } from "./ShiftScheduleOptions";

function ShiftAssignmentForm() {
    const {shifts, nurses, saveShiftAssignment, isScheduleConflict, isNurseQualified, useComponentVisible} = useGlobalContext();
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

        for (let option of shiftOptions) {
            //shiftId is 1 off from shift option selected because indexing starts at 0
            if (option.selected) shiftSelectedId = parseInt(option.value) - 1;
        }

        for (let option of nurseOptions) {
            if (option.selected) nurseSelectedId = parseInt(option.value);
        }

        if (isScheduleConflict(shifts[shiftSelectedId].start, shifts[shiftSelectedId].end, nurseSelectedId)) {
            alert("Error: This nurse is already working during the chosen shift.")
            //nurse selection id is 1 off from nurse option selected because indexing starts at 0
        } else if (!isNurseQualified(nurses[nurseSelectedId - 1].qualification, shifts[shiftSelectedId].qual_required)) {
            alert("Error: This nurse isn't qualified to work the chosen shift." +
                "\n\nA CNA can only work CNA shifts.\n" +
                "An LPN can work CNA or LPN shifts.\n" +
                "An RN can work CNA, LPN, or RN shifts")
        } else {
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

    //conditionally renders the shift assignment form using custom hook
    return (
        <div>
            {/*
            //useref hook may need refactoring due to re-renderings, best practices(?)
            */}
            <button ref={ref} id="assignmentButton" onClick={() => setIsComponentVisible(!isComponentVisible)}>
                Set Shift Assignment
            </button>
            <div ref={ref}>
                {isComponentVisible && (
                    <form id="shiftAssignmentForm" ref={ref} onSubmit={(e) => handleSubmit(e)}>
                        <header>Set Shift Assignment</header>
                        <div id="shiftOption">
                            <label>Shift</label>
                            <select id="shift" value={shiftSelected} onChange={(e) => handleShiftChange(e)}>
                                <option/>
                                {shifts.map((shiftProps) => (
                                    <ShiftOption key={shiftProps.id} shiftProps={shiftProps}/>
                                ))}
                            </select>
                        </div>

                        <div id="nurseOption">
                            <label>Nurse</label>
                            <select id="nurse" value={nurseSelected} onChange={(e) => handleNurseChange(e)}>
                                <option/>
                                {nurses.map((nurseProps) => (
                                    <NurseOption key={nurseProps.id} nurseProps={nurseProps}/>
                                ))}
                            </select>
                        </div>
                        <button type="submit" disabled={!shiftSelected}>Save Assignment</button>
                    </form>)}
            </div>
        </div>
    );
}


export default ShiftAssignmentForm;
