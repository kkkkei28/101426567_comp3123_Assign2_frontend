import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css"; // Apply the new CSS for styling

function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/user/signup", formData);
      alert("Signup Successful!");
      navigate("/login"); // Redirect to login page after signup
    } catch (err) {
      alert("Signup Failed! " + (err.response?.data?.message || err.message));
    }
  };

  const handleBackToLogin = () => {
    navigate("/login"); // Navigate to Login page
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Signup</h2>
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
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
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
          <div className="button-group">
            <button type="submit" className="btn-signup-submit">
              Signup
            </button>
            <button type="button" className="btn-signup-back" onClick={handleBackToLogin}>
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
