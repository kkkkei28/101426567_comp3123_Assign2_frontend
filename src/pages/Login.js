import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import '../styles/Login.css'; 

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/login", credentials);
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      alert("Login Successful!");
      navigate("/employees"); // Redirect to Employee List page
    } catch (err) {
      alert("Login Failed! " + (err.response?.data?.message || err.message));
    }
  };

  const handleExit = () => {
    navigate("/"); // Redirect to Home Page
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button
              type="button" // Set button type to "button" to prevent form submission
              className="btn btn-danger ms-2" // Make the button red and add spacing
              onClick={handleExit} // Call handleExit on click
            >
              Exit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
