import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate =useNavigate();

  const handleSignUp = async () => {
    
    try {
      // Add validation logic if needed (e.g., checking if passwords match)
  
      
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });
      console.log(response);
      navigate('/login');
    } catch (error) {
    console.log(error);
    }
  };

  return (
<div className="signup-form">
  <h2>Sign Up</h2>
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
    <input
    type="email"
    placeholder="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button onClick={handleSignUp}>Sign Up</button>
  <p>Already have an account? <Link to="/login">Login here</Link></p>
</div>

  );
};

export default SignUp;
