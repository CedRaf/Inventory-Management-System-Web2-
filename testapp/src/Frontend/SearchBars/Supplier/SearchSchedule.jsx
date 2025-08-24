import { useState } from 'react';
import axios from 'axios';

function SearchSchedule({ suppliers, setSuppliers, error, setError, token }) {
  const [schedule, setSchedule] = useState('');
  
  const handleChange = (e) => {
    setSchedule(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getSuppliersBySchedule(schedule);
  };

  const getSuppliersBySchedule = async (schedule) => {
    try {
      const result = await axios.get(`http://localhost:3000/supplier/sched/${schedule}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
      setSuppliers(result.data.data);
    } catch (error) {
      setError('Unable to find suppliers of this schedule');
    }
  };

  // Define the static gender options
  const options = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' }
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="selectOption">Select a Schedule:</label>
        <select id="selectOption" value={schedule} onChange={handleChange}>
          <option value="">Select Schedule</option>
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

export default SearchSchedule;
