import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddEmployee.css"; 

function AddEmployee() {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    date_of_joining: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/v1/emp/employees", employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee added successfully!");
      navigate("/employees"); // Redirect back to Employee List
    } catch (err) {
      alert("Failed to add employee: " + (err.response?.data?.message || err.message));
    }
  };

  const handleBackToList = () => {
    navigate("/employees"); // Navigate back to the employee list
  };

  return (
    <div className="add-employee-page">
      <div className="add-employee-container">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              name="firstname"
              className="form-control"
              value={employee.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              name="lastname"
              className="form-control"
              value={employee.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Position</label>
            <input
              name="position"
              className="form-control"
              value={employee.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              name="department"
              className="form-control"
              value={employee.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Salary</label>
            <input
              name="salary"
              type="number"
              className="form-control"
              value={employee.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Joining</label>
            <input
              name="date_of_joining"
              type="date"
              className="form-control"
              value={employee.date_of_joining}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            {/* Button to go back to the list */}
            <button type="submit" className="btn-add-submit">
              Add Employee
            </button>
            <button type="button" className="btn-add-back" onClick={handleBackToList}>
              Back to List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
