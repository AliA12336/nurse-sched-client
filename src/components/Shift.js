import { useGlobalContext } from "./NurseShiftContext";
import React from "react";

function Shift({shiftProps}) {
    const {shifts, nurses} = useGlobalContext();

    return (
        <tr>
            {/*{console.log(nurses)}*/}
            <td>{shiftProps.name}</td>
            <td>{formatDate(shiftProps.start)}</td>
            <td>{formatDate(shiftProps.end)}</td>
            <td>{shiftProps.qual_required}</td>
            <td>{formatNurseName(shiftProps.nurse_id, nurses)}</td>
        </tr>
    )
}


function formatDate(utcDate) {
    const date = new Date(utcDate);
    const formattedDate = date.toLocaleString();
    return formattedDate;
}

function formatNurseName(nurse_id, nurses) {
    for(let nurse of nurses) {
        if(nurse.id === nurse_id) {
            return nurse.first_name + " " + nurse.last_name + ", " + nurse.qualification;
        }
    }
    return "";
}

export default Shift;
