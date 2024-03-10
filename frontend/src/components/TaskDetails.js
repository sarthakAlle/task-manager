import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedTaskData, setUpdatedTaskData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        // Use Axios for the HTTP request
        const response = await axios.get(`https://task-manager-r0r9.onrender.com/tasks/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

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
  }, [id, editMode]);

const handleDelete = async () => {
  try {
    // Ask for confirmation before proceeding
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');

    // If the user confirms, proceed with the deletion
    if (isConfirmed) {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      // Use Axios for the HTTP request
      await axios.delete(`https://task-manager-r0r9.onrender.com/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Handle successful deletion (e.g., redirect or show a success message)
      alert('Task deleted successfully');
      navigate('/taskList');
    }
    // If the user cancels, do nothing
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

  const handleEdit = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      // Use Axios for the HTTP request
      await axios.put(`https://task-manager-r0r9.onrender.com/tasks/${id}`, updatedTaskData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Handle successful edit (e.g., redirect or show a success message)
      alert('Task edited successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTaskData({
      ...updatedTaskData,
      [name]: value,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);

    // Set initial values for the updated task data
    setUpdatedTaskData({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
    });
  };

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
        <button id="delete_button" onClick={handleDelete}>Delete</button>
        {editMode ? (
          <>
            <button id="save_button" onClick={handleEdit}>Save</button>
            <button id="cancel_button" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <button id="edit_button" onClick={toggleEditMode}>Edit</button>
        )}
      </div>

      {editMode && (
        <div className="edit-form">
          <label htmlFor="edit_title">Title:</label>
          <input
            type="text"
            id="edit_title"
            name="title"
            value={updatedTaskData.title}
            onChange={handleInputChange}
          />
          <label htmlFor="edit_description">Description:</label>
          <textarea
            id="edit_description"
            name="description"
            value={updatedTaskData.description}
            onChange={handleInputChange}
          />
          <label htmlFor="edit_due_date">Due Date:</label>
          <input
            type="date"
            id="edit_due_date"
            name="due_date"
            value={updatedTaskData.due_date}
            onChange={handleInputChange}
          />
          <label htmlFor="edit_status">Status:</label>
          <select
            id="edit_status"
            name="status"
            value={updatedTaskData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;


