import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
      <li>
        <Link to="/userprofile">Profile</Link>
        </li>
        <li>
          <Link to="/taskform">Task Form</Link>
        </li>
        <li>
          <Link to="/tasklist">Task List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
