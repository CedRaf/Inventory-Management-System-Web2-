import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
import logo from './images/companyLogo.png';


const Login = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeID, password }),
      });
      if (response.status === 401) {
        alert('Invalid employeeID or password');
        return;
      }
      const data = await response.json();
        const { user , accessToken } = data;
        
        localStorage.setItem('token', accessToken);
        
        localStorage.setItem('user', JSON.stringify(user))

        navigate('/product-information');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (  
    <body className="align">
    <div className="grid align__item">
      <div className="register">
      <img src = {logo} alt="Site Logo" class="site__logo" width="150" height="150"/>
        <p className = "headerP">SYT Glass IMS</p>
        
        
        <form method="post" class="form" onSubmit={handleLogin}>
          <div className="form__field">
            <input type="text" placeholder="Employee ID" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} />
          </div>
          <div className="form__field">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form__field">
            <input type="submit" value="Sign In" />
          </div>
          
        </form>
        <p>New Employees <Link to="/register">Register Here</Link></p>
      </div>
    </div>
  </body>
  );
};

export default Login;