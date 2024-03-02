import './App.css';
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList'; 
import { Tasks } from './components/Tasks'; // Assuming Task model is in a separate file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskDetails from './components/TaskDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';




const App = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/tasklist" element={<TaskList/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/taskform" element={<TaskForm/>} />
        <Route path="/taskDetails/:id" element={<TaskDetails/>} />
      </Routes>
    </div>
  </Router>
  );
};


export default App;
