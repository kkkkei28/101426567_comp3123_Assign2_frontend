import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeList.css"; 

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate(); 

  // Fetch all employees when the page loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/v1/emp/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data.employees);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  // Handle Search
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!department && !position) {
        const response = await axios.get("http://localhost:5000/api/v1/emp/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data.employees);
        return;
      }
  
      let query = "";
      if (department) query += `department=${department}`;
      if (position) query += `&position=${position}`;
  
      const response = await axios.get(`http://localhost:5000/api/v1/emp/search?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setEmployees(response.data.employees);
    } catch (err) {
      alert("Search Failed! " + (err.response?.data?.message || err.message));
    }
  };

  // Reset search filters
  const handleReset = () => {
    setDepartment("");
    setPosition("");
    // Fetch all employees again
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/v1/emp/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data.employees);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  };

  // Navigate to the "Add Employee" page
  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  // Navigate to the "View Employee" page
  const handleViewEmployee = (id) => {
    navigate(`/view-employee/${id}`);
  };

  // Navigate to the "Edit Employee" page
  const handleEditEmployee = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  // Handle Delete Employee
  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployees(employees.filter((emp) => emp.id !== id));
            alert("Employee deleted successfully!");
        } catch (err) {
            alert("Failed to delete employee: " + (err.response?.data?.message || err.message));
        }
    }
  };

  return (
    <div className="employee-list-page">
      <div className="employee-list-container">
        <h2>Employee List</h2>

        {/* Add Employee Button */}
        <div className="mb-3">
          <button className="btn btn-success add-employee" onClick={handleAddEmployee}>
            Add Employee
          </button>
        </div>

        {/* Search Bar */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Position (Optional)"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.firstname}</td>
                  <td>{emp.lastname}</td>
                  <td>{emp.email}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => handleViewEmployee(emp.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditEmployee(emp.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
