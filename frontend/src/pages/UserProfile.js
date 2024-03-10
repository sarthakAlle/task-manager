// Import necessary modules
import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('Authentication token not found.');
          return;
        }
        // Make an API request to fetch user data
        const response = await fetch('https://task-manager-r0r9.onrender.com/userprofile', {
          method:"GET",
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authentication token
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log("response json :",data);
        setUserData(data);
      } catch (error) {
        // Handle error
        console.error('Error fetching user data:', error.message);
      }
    };
    if (/*isLoggedIn*/ true) {
      fetchUserData();
    }
  }, [/*isLoggedIn*/]);

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear the token from localStorage and redirect to the login page
    localStorage.removeItem('token');
    // Redirect to the login page or any other desired action
    window.location.href = '/';
  };

  return (
    <div>
    {userData ? (
      <div className="profile-info">
        <h1>Hello {userData.username}</h1>
        <p>{userData.email}</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    ) : (
      <p className="loading">Loading...</p>
    )}
  </div>
  );
};

export default UserProfile;
