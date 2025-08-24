import { useState } from 'react';
import axios from 'axios';

function SearchStatus({ orders, setOrders, error, setError, token }) {
  const [status, setStatus] = useState('');
  
  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getOrdersByStatus(status);
  };

  const getOrdersByStatus = async (status) => {
    try {
      const result = await axios.get(`http://localhost:3000/orders/orderDetails/status/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(result.data.data);
    } catch (error) {
      setError('Unable to find orders with this status');
    }
  };

  // Define the static status options
  const options = [
    { value: 'pending', label: 'pending' },
    { value: 'completed', label: 'completed' },
    { value: 'cancelled', label: 'cancelled' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="selectOption">Select a status:</label>
        <select id="selectOption" value={status} onChange={handleChange}>
          <option value="">Select status</option>
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

export default SearchStatus;
