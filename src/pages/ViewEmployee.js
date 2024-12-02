import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ViewEmployee.css"; // Add CSS for styling

function ViewEmployee() {
  const [employee, setEmployee] = useState({});
  const { id } = useParams(); // Get the employee ID from URL params
  const navigate = useNavigate();

  // Fetch the employee data based on the ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/v1/emp/employees/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployee(response.data.employee);
      } catch (err) {
        console.error("Error fetching employee data:", err);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleBackToList = () => {
    navigate("/employees"); // Navigate back to employee list
  };

  const handleEditEmployee = () => {
    navigate(`/edit-employee/${id}`); // Navigate to edit employee page
  };

  return (
    <div className="view-employee-page">
      <div className="view-employee-container">
        <h2>Employee Details</h2>
        <div className="employee-info">
          <p><strong>First Name:</strong> {employee.firstname}</p>
          <p><strong>Last Name:</strong> {employee.lastname}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Date of Joining:</strong> {employee.date_of_joining}</p>
        </div>
        <div className="button-group">
        <button className="btn btn-edit-employee-page" onClick={handleEditEmployee}> Edit </button>
        <button className="btn btn-view-employees-page" onClick={handleBackToList}> Back to List </button>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployee;
