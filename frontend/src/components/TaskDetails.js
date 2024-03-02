import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTask();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code, if needed
    };
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='card'>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.due_date && (
        <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      )}
      <p>Status: {task.status}</p>
      <div className='button-container'>
      <button id ="delete_button">Delete</button>
      <button id ="edit_button">Edit</button>
      </div>
  
    </div>
  );
};

export default TaskDetails;



