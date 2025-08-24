import { useState } from 'react';
import axios from 'axios';

function SearchPosition({ employees, setEmployees, error, setError, token }) {
  const [position, setPosition] = useState('');
  
  const handleChange = (e) => {
    setPosition(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getEmployeesByPosition(position);
  };

  const getEmployeesByPosition = async (position) => {
    try {
      const result = await axios.get(`http://localhost:3000/employees/position/${position}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setEmployees(result.data.data);
    } catch (error) {
      setError('Unable to find employees with this position');
    }
  };

  // Define the static status options
  const options = [
    { value: 'Employee', label: 'Employee' },
    { value: 'Manager', label: 'Manager' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="selectOption">Select a Position:</label>
        <select id="selectOption" value={position} onChange={handleChange}>
          <option value="">Select position </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchPosition;
