import {useGlobalContext} from "./NurseShiftContext";

function ShiftOption({shiftProps}) {
    const { formatDate } = useGlobalContext();
    return (
        <option>{
                shiftProps.name + ": " +
                //passing in true to return date formatted with just the time returned
                formatDate(shiftProps.start, true) +
                "-" +
                formatDate(shiftProps.end, true) +
                " (" +
                shiftProps.qual_required + ")"
        }</option>
    )
}

function NurseOption({nurseProps}) {
    const { formatNurseName } = useGlobalContext();
    return (
        <option>
            {formatNurseName(nurseProps.id)}
        </option>
    )
}

export { ShiftOption, NurseOption };
