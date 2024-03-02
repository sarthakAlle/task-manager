import React, { useState } from 'react';
import { Task } from './Tasks';

const TaskEdit = ({ task, onEditTask, onDeleteTask }) => {
  // State variables for editing task data
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || ''); // Handle optional description
  const [due_date, setDueDate] = useState(task.due_date ? task.due_date.toISOString().split('T')[0] : ''); // Convert due_date to date string for input
  const [status, setStatus] = useState(task.status);

  // Function to handle form submission for editing the task
  const handleEditTask = (e) => {
    e.preventDefault();
    const updatedTask = new Task(task.id, title, description, due_date ? new Date(due_date) : undefined, status); // Create a new Task object with updated data
    onEditTask(updatedTask); // Call the onEditTask function passed as a prop, passing the updated task object
  };

  // Function to handle task deletion
  const handleDeleteTask = () => {
    onDeleteTask(task.id); // Call the onDeleteTask function passed as a prop, passing the task ID
  };

  return (
    <div>
      <h3>Edit Task</h3>
      <form onSubmit={handleEditTask}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="due_date">Due Date:</label>
        <input type="date" id="due_date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={handleDeleteTask}>Delete Task</button>
    </div>
  );
};

export default TaskEdit;
