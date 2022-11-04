import './App.css';
import ShiftSchedule from "./components/ShiftSchedule";
import { useGlobalContext } from "./components/NurseShiftContext";

function App() {
    const { shifts, nurses } = useGlobalContext();

  return (
      <div className="App">
          <ShiftSchedule />
      </div>
  );
}

export default App;
