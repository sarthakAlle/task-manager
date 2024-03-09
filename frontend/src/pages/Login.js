import React, { useState} from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate =useNavigate();
  const { login } = useAuth();


  const handleLogin = async () => {
 
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
     
      const token = response.data.token;
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', token);

      // Redirect or perform other actions after successful login
      login();
      navigate('/userprofile');
    } catch (error) {
      alert("user dosen't exists ,please sign up first");
     console.log(error);
    }
  };

  return (
<div className="login-form">
  <h2>Login</h2>
  <input
    type="text"
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
  <button onClick={handleLogin}>Login</button>
  <p>don't have an account? <Link to="/">SignUp here</Link></p>
</div>

  );
};

export default Login;
