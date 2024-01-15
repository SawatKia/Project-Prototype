import "./App.css";
import StudentForm from "./component/StudentForm";
import StudentTable from "./component/StudentTable";

function App() {
  return (
    <div className="App font-['Kanit']">
      <StudentForm initialValues={{ name: '', address: '', mobile: '' }} />
      <StudentTable />
    </div>
  );
}

export default App;
