import { useState } from 'react';
import axios from 'axios';

function SearchGender({ employees, setEmployees, error, setError, token }) {
  const [gender, setGender] = useState('');
  
  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getEmployeesByGender(gender);
  };

  const getEmployeesByGender = async (gender) => {
    try {
      const result = await axios.get(`http://localhost:3000/employees/gender/${gender}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
      setEmployees(result.data.data);
    } catch (error) {
      setError('Unable to find employees of this gender');
    }
  };

  // Define the static gender options
  const options = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="selectOption">Select a Gender:</label>
        <select id="selectOption" value={gender} onChange={handleChange}>
          <option value="">Select gender</option>
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

export default SearchGender;
