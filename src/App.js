import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee"; // Import AddEmployee
import ViewEmployee from "./pages/ViewEmployee"; // Import ViewEmployee
import EditEmployee from './pages/EditEmployee';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/view-employee/:id" element={<ViewEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
