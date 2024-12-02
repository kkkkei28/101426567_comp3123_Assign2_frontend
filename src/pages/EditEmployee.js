import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditEmployee.css"; 

function EditEmployee() {
  const { id } = useParams(); 
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


  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data.employee); 
      } catch (err) {
        console.error("Error fetching employee details:", err);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/v1/emp/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee updated successfully!");
      navigate("/employees"); // Redirect back to the Employee List
    } catch (err) {
      alert("Failed to update employee: " + (err.response?.data?.message || err.message));
    }
  };

  const handleBackToList = () => {
    navigate("/employees"); // Navigate back to the employee list
  };

  return (
    <div className="edit-employee-page">
      <div className="edit-employee-container">
        <h2>Edit Employee</h2>
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
              value={employee.date_of_joining.split("T")[0]} // Format for HTML date input
              onChange={handleChange}
              required
            />
          </div>
          {/* <button type="submit" className="btn btn-primary">
            Update Employee
          </button> */}
        </form>
        <div className="button-group">
        <button className="btn-edit-update" onClick={handleSubmit}>
            Update
          </button>
          <button className="btn-edit-back" onClick={handleBackToList}>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
