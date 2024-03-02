/*import React, { useState } from 'react';
import { Task } from './Tasks';
import './TaskForm.css';

const TaskForm =({ }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due_date, setDueDate] = useState('');
  const taskData = { title, description,due_date };
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        // Handle successful task creation (e.g., show a success message)
        console.log('Task created successfully');

      } else {
        // Handle errors from the server
        console.error('Failed to create task');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };


  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="due_date">Due Date:</label>
        <input type="date" id="due_date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
*/
import React, { useState } from 'react';
import { Task } from './Tasks';
import './TaskForm.css';

const TaskForm = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due_date, setDueDate] = useState(''); // Changed due_date to dueDate for consistency
  const taskData = { title, description, due_date }; // Changed due_date to dueDate for consistency
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
   
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
      });
      console.log(response);
      if (response.ok) {
        // Handle successful task creation (e.g., show a success message)
        console.log('Task created successfully');
      } else {
        // Handle errors from the server
        console.error('Failed to create task');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="due_date">Due Date:</label>
        <input type="date" id="due_date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;