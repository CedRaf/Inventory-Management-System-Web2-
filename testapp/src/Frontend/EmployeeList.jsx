import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AddEmployee from './Add/AddEmployee';
import UpdateEmployee from './Update/UpdateEmployee';
import './css/ProductList.css';
import { useNavigate } from 'react-router-dom';
import SearchName from './SearchBars/Employees/SearchName';
import SearchGender from './SearchBars/Employees/SearchGender';
import SearchPosition from './SearchBars/Employees/SearchPosition';
import logo from './images/companyLogo.png';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
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
  const [error, setError] = useState(null);
  const [token, setToken] = useState(''); 
  const [user, setUser] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  
  const [resetSort, setResetSort]= useState(null);
  const navigate = useNavigate();
  const handleReload = () => {
    window.location.reload();
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserParsed = JSON.parse(storedUser);

    if (storedToken && storedUserParsed) {
      setToken(storedToken);
      setUser(storedUserParsed);
    }
  }, []);

  console.log(user)

  useEffect(() => {

    const getEmployees = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/employees/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user: user, 
          },
        });
        setEmployees(result.data.data);
      } catch (error) {
        setError('Unable to fetch employees');
      }
    };

    if (token && user) {
      getEmployees();
    }
  }, [token]);

  const deleteEmployee = async (employeeId) => {
    try {
      const result= await axios.patch(`http://localhost:3000/employees/delete/${employeeId}`, null,
       {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleReload();
    } catch (error) {
      setError('Unable to delete employee.');
    }
  };
console.log(user)
  const addEmployee = async (newEmployeeData) => {
    try {
      const newEmp = await axios.post('http://localhost:3000/employees/', newEmployeeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, // Include the user data here
        },
      });
      setEmployees([...employees, newEmp.data]);
    } catch (error) {
      setError('Unable to add employee');
    }
  };

  const updateEmployee = async (newEmployeeData) => {
    try {
      await axios.patch(`http://localhost:3000/employees/${newEmployeeData.employeeID}`, newEmployeeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, // Include the user data here
        },
      });
      const updatedEmployeeList = employees.map(employee => {
        if (employee.employeeID === newEmployeeData.employeeID) {
          // Update the specific product that matches the condition
          return { ...employee, ...newEmployeeData };
        }
        return employee; // Return unchanged products
      });
    
      // Set the updated products list in the state
      setEmployees(updatedEmployeeList);
    } catch (error) {
      setError('Unable to add employee');
    }
  };
  const handleUpdateClick = (employee) => {
    toggleUpdate();
    setSelectedEmployee(employee);
  };


  const resetSortHandle= async() => {
    setResetSort(prevSort => !prevSort); // Toggle the state between true and false
    if(resetSort === true || resetSort === false){
      try {
        const result = await axios.get(`http://localhost:3000/employees/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user: user, // Include the user data here
          },
        });
        setEmployees(result.data.data);
      } catch (error) {
        setError('Unable to fetch default employees');
      }
    }
  }

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  }
  const [showAdd,setShowAdd] = useState(null);
  const toggleAdd = (e) => {
    setShowAdd(prevShowAdd => !prevShowAdd);
  }
  const [showUpdate,setShowUpdate] = useState(null);
  const toggleUpdate = (e) => {
    setShowUpdate(prevShowUpdate => !prevShowUpdate);
  }
  
  return (
    <div className="product-page-container">
      {error && <p>{error}</p>}
      <div className="header">
          <div className="companyLogo">
            <img src ={logo}></img>
          </div>
          <div className="Logout">
            <button onClick={handleLogout}>Log Out</button>
          </div>
      </div>

      <div className="product-body">
      <div className="leftMain"> <Sidebar /></div>
      <div className="rightMain">
      <div className="SearchBars">
      <div className="notDefault">
        <SearchGender employees={employees} setEmployees= {setEmployees} user={user} setError = {setError} error={error} token={token} />
        <SearchName employees={employees} setEmployees= {setEmployees} user={user} setError = {setError} error={error} token={token} />
        <SearchPosition employees={employees} setEmployees= {setEmployees} user={user} setError = {setError} error={error} token={token} />
      </div>  
        <button className="Default" onClick={resetSortHandle}>Default View</button> 
      </div>

      <div className= "AddProduct">
      <h3><button onClick={toggleAdd}>Add an employee</button></h3>
                {showAdd && (
                <AddEmployee addEmployee={addEmployee} setNewEmployee={setNewEmployee} newEmployee={newEmployee} />
      )}
    
      </div>
      {showUpdate && (
          <UpdateEmployee updateEmployee={updateEmployee} setEmployee={setSelectedEmployee} employee= {selectedEmployee}/>
        )}
        <h4 id="Title">Employee Information</h4>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Fist Name</th>
              <th>Last Name</th>
              <th>Birthdate</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Employee Type</th>
              <th>Employee Email</th>
              <th>Password</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.employeeID}>
                <td>{employee.employeeID}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.birth_date}</td>
                <td>{employee.address}</td>
                <td>{employee.gender}</td>
                <td>{employee.phone_number}</td>
                <td>{employee.emp_type}</td>
                <td>{employee.emp_email}</td>
                <td>{employee.password}</td>
                <td>
                  <button onClick={() => deleteEmployee(employee.employeeID)}>Delete</button>
                  <button onClick={() => handleUpdateClick(employee)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      
    </div>
    </div>
  );
}

export default EmployeeList;
