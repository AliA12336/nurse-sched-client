import './App.css';
import ShiftSchedule from "./components/ShiftSchedule";
import ShiftAssignmentForm from "./components/ShiftAssignmentForm";

//consider tradeoffs of using 3rd party lib vs js functions
//maintainability at scale(?)
//time management: tdd(?) pros vs cons
function App() {
  return (
      <div className="App">
          <ShiftAssignmentForm/>
          <ShiftSchedule />
      </div>
  );
}

export default App;
