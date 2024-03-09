/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskDetails.css';
import { Link } from 'react-router-dom';

const apiUrl = 'http://localhost:5000/taskList';

const TaskList = () => {
  const [taskList, setTaskList] = useState([]); // State to hold the list of tasks

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        // Use Axios for the HTTP request
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        console.log('Response:', response.data);
        setTaskList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTaskList();
  }, []);

  return (
    <ul>
    {taskList.map((task) => (
      <div key={task._id} className='card'>
        <h3>{task.title}</h3>
        {task.due_date && <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>}
        <p>Status: {task.status}</p>
        <Link to={`/taskDetails/${task._id}`}>view details</Link>
      </div>
    ))}
  </ul>
  
  );
};

export default TaskList;


*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './TaskDetails.css';
import './TaskList.css';
const apiUrl = 'http://localhost:5000/taskList';

const TaskList = () => {
  const [taskList, setTaskList] = useState({ tasks: [] }); // Initialize taskList as an object with a tasks property
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}?page=${currentPage + 1}&per_page=${itemsPerPage}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Response:', response.data);
        setTaskList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTaskList();
  }, [currentPage]);

  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
         <ReactPaginate
         previousLabel="Previous"
         nextLabel="Next"
         pageCount={(Math.ceil(taskList.total / itemsPerPage))}
         onPageChange={({ selected }) => setCurrentPage(selected)}
         containerClassName="pagination"
         activeClassName="active"
       />
</div>
    <div className='grid'>
  
        {taskList.tasks && taskList.tasks.map((task) => (
          <div key={task._id} className='card'>
            <h3>{task.title}</h3>
            {task.due_date && <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>}
            <p>Status: {task.status}</p>
            <Link to={`/tasks/${task._id}`}>view details</Link>
          </div>
        ))}

    </div>
       </>
  );
};

export default TaskList;


