import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import logo from './images/companyLogo.png';

function Register(){
    const navigate= useNavigate();
    const [newEmployee, setNewEmployee] = useState({
      first_name: '',
      last_name: '',
      birth_date: '',
      address: '',
      gender: '',
      phone_number: '',
      emp_type: '',
      emp_email: '',
      password: ''
    });
    const [secretKey, setSecretKey]= useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };
    const handleSecretKeyChange=(e)=>{
        setSecretKey(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(newEmployee);
        setNewEmployee({
            first_name: '',
            last_name: '',
            birth_date: '',
            address: '',
            gender: '',
            phone_number: '',
            emp_type: '',
            emp_email: '',
            password: ''
          });
    };


    const handleRegister = async (newEmployee) => {
        try{
        
        const response=await axios.post('http://localhost:3000/auth/register', newEmployee, {
            headers: {
              EmployeeKey: `${secretKey}`,
            }
        });

        if (response.status === 401) {
            alert('Invalid employeeID or password');
            return;
        }


        navigate('/');

        } catch (error) {
          setError('Error signing up:');
        }
      };


    return(
        
      <body className="align">
      <div className="grid align__item">
        <div className="register">
        <img src = {logo} alt="Site Logo" class="site__logo" width="150" height="150"/>
          <p className = "headerP">SYT Glass IMS</p>   

        <h1>Sign Up</h1>
        <form class="form" onSubmit={handleSubmit}>
        <div className="form__field">
        <input type="text" name="first_name" placeholder="Enter new First Name" value={newEmployee.first_name || ''} onChange={handleChange}/>
        </div>
        <div className="form__field">
        <input type="text" name="last_name" placeholder="Enter new last name" value={newEmployee.last_name || ''} onChange={handleChange} />
        </div>
        <div className="form__field">
        <input type="date" name="birth_date" placeholder="Enter new birthdate" value={newEmployee.birth_date || ''} onChange={handleChange} />
        </div>
        <div className="form__field">
        <input type="text" name="address" placeholder="Enter new address" value={newEmployee.address || ''} onChange={handleChange} />
        </div>
        <div className="form__field">
        <input type="text" name="gender" placeholder="Enter new gender" value={newEmployee.gender || ''} onChange={handleChange} />
        </div>
        <div className="form__field">
        <input type="text" name="phone_number" placeholder="Enter new phone number" value={newEmployee.phone_number || ''} onChange={handleChange}/>
        </div>
        <div className="form__field">
        <input type="text" name="emp_type" placeholder="Enter new employee type" value={newEmployee.emp_type || ''} onChange={handleChange} />
        </div>
        <div className="form__field">
        <input type="text" name="emp_email" placeholder="Enter new employee email" value={newEmployee.emp_email || ''} onChange={handleChange} />
        </div>
        <div className="form__field">
        <input type="text" name="password" placeholder="Enter new password" value={newEmployee.password || ''} onChange={handleChange} />
        </div>
        <div className="form__field">
        <input type="text" name="secretKey" placeholder="Enter provided Secret Key" value={secretKey || ''} onChange={handleSecretKeyChange} />
        </div>
        
        <button type="submit">Add Employee</button>
      </form>
      </div>
      </div>
      </body>
    )
}


export default Register