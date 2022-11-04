import React, {useEffect} from "react";
import {useGlobalContext} from "./NurseShiftContext";
import Shift from "./Shift";

function ShiftSchedule() {
    const {shifts, nurses} = useGlobalContext();

    //conditional rendering to prevent loading the shift schedule before
    //async fetch has returned data
    return !shifts.length ? null : (
        <div className="App">
            <table>
                <thead>
                <tr>
                    <th>Shift</th>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Certification required</th>
                    <th>Assigned nurse</th>
                </tr>
                </thead>
                {shifts.map((shiftProps) => (
                    <tbody>
                    <Shift key={shiftProps.id} shiftProps={shiftProps}/>
                    </tbody>
                ))}
            </table>
        </div>
    );
}

export default ShiftSchedule;
