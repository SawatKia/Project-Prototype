import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Pages/LoginPage/Login";
// import Register from "./Pages/RegisterPage/Register"
import Home from "./Pages/HomePage/Home";
import TableAndForm from "./Pages/TableAndFormPage/TableAndForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tableAndForm" element={<TableAndForm />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
