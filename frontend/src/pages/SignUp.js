import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate =useNavigate();

  /*
  const handleSignUp = async () => {
    try {
      // Add validation logic if needed (e.g., checking if passwords match)
  
      const response = await axios.post('https://task-manager-r0r9.onrender.com/signup', {
        username,
        email,
        password,
      });
  
      console.log(response);
  
      // Assuming your server returns a specific status code (e.g., 409) for user already exists
      if (response.status === 409) {
        // Show an alert or handle the user already exists scenario
        alert('User already exists. Please login.');
        // You can also redirect to the login page or do something else
        navigate('/login');
      } else {
        // User created successfully, navigate to the login page
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };
  */
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        'https://task-manager-r0r9.onrender.com/signup',
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true, // Enable sending cookies and authentication headers
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
            'Access-Control-Allow-Origin':'true'
          },
        }
      );
  
      console.log(response);
  
      if (response.status === 200 || response.status === 201) {
        // User created successfully, navigate to the login page
        alert('Signup successful. Please login.');
        // You can also redirect to the login page or do something else
        navigate('/login');
      } else {
        // Handle other status codes or error scenarios
        console.error('Signup failed:', response.data); // Log the response data for debugging
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again.');
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
