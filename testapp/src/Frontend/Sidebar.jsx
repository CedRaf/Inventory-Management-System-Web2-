import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css'

// Profile component
function Profile({ user }) {
  // Display employee profile information based on 'employees' prop
  return (
    <div id="profile">
      <h3>Employee Profile</h3>
      <p>Employee ID: {user.employeeID}</p>
      <p>Employee Type: {user.emp_type}</p>
    </div>
  );
}

// BottomPart component (renamed from 'bottomPart' to 'BottomPart')
function BottomPart() {
  return (
    <div id="bottom-section-employee-actions">
        <div className="right-side-actions">
          {/* Display list of actions */}
          <h3>Actions</h3>
          <ul>
            <li><Link to="/product-information"> View Products </Link></li>
            <li><Link to="/customer-information"> View Customers </Link></li>
            <li><Link to="/employee-information"> View Employees </Link></li>
            <li><Link to="/supplier-information"> View Suppliers </Link></li>
            <li><Link to="/manage-order"> Manage Orders </Link></li>
          </ul>
        </div>
      </div>
  );
}

// Sidebar component
function Sidebar() {
 
  const [error, setError] = useState(null);
  const [token, setToken] = useState(''); // Define the token here
  const [user, setUser] = useState('');
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserParsed = JSON.parse(storedUser);

    if (storedToken && storedUserParsed) {
      setToken(storedToken);
      setUser(storedUserParsed);
    }
  }, [token]);

  return (
    <div>
      {/* Pass employees data to Profile and BottomPart components */}
      <Profile user={user} />
      <BottomPart  />
    </div>
  );
}

export default Sidebar;
