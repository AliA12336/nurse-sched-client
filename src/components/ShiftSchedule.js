import React from "react";
import { useGlobalContext } from "./NurseShiftContext";
import Shift from "./Shift";

function ShiftSchedule() {
    const {shifts} = useGlobalContext();

    /*
    conditional rendering to prevent loading the shift schedule before
    async fetch has returned shift data
    */
    return !shifts.length ? null : (
        <div>
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

                <tbody>
                {shifts.map((shiftProps) => (
                    <Shift key={shiftProps.id} shiftProps={shiftProps}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShiftSchedule;
