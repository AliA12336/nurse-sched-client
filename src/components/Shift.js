import { useGlobalContext } from "./NurseShiftContext";
import React from "react";

function Shift({shiftProps}) {
    const { formatDate, formatNurseName } = useGlobalContext();

    return (
        <tr>
            <td>{shiftProps.name}</td>
            <td>{formatDate(shiftProps.start)}</td>
            <td>{formatDate(shiftProps.end)}</td>
            <td>{shiftProps.qual_required}</td>
            <td>{formatNurseName(shiftProps.nurse_id)}</td>
        </tr>
    )
}


export default Shift;
