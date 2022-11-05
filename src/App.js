import './App.css';
import ShiftSchedule from "./components/ShiftSchedule";
import { useGlobalContext } from "./components/NurseShiftContext";
import { useEffect, useRef, useState } from "react";
import ShiftAssignmentForm from "./components/ShiftAssignmentForm";


function App() {
    const { shifts, nurses } = useGlobalContext();

  return (
      <div className="App">
          <ShiftAssignmentForm/>
          <ShiftSchedule />
      </div>
  );
}

export default App;
