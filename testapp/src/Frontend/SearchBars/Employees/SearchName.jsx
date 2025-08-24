import React, { useState, useEffect } from 'react';
import axios from 'axios';
function SearchName({ employees, setEmployees, user, error, setError, token }) {
    const [name, setName] = useState('');
    const [tempEmployees, setTempEmployees] = useState('')
    const handleChange = (e) => {
      setName(e.target.value);
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      getEmployeesByName(name);
      
    };
  
    const getEmployeesByName = async(name) => {
        try {
            const result = await axios.get(`http://localhost:3000/employees/name/${name}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                  user: user, 
                },
              
            });
            setEmployees(result.data.data);
          } catch (error) {
            setError('Unable to find Employee name');
          }
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="selectOption">Select a name:</label>
          <select id="selectOption" value={name} onChange={handleChange}>
            <option value="">Select location</option>
            {employees.map((employee, index) => (
              <option key={index} value={employee.first_name}>
                {employee.first_name}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
export default SearchName;