import React, { useState, useEffect } from 'react';
import axios from 'axios';
function SearchByContact({ suppliers, setSuppliers, user, error, setError, token }) {
    const [name, setName] = useState('');
    
    const handleChange = (e) => {
      setName(e.target.value);
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      getSuppliersByName(name);
      
    };
  
    const getSuppliersByName = async(name) => {
        try {
            const result = await axios.get(`http://localhost:3000/supplier/name/${name}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                  user: user, 
                },
              
            });
            setSuppliers(result.data.data);
          } catch (error) {
            setError('Unable to find Supplier contact name');
          }
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="selectOption">Select a name:</label>
          <select id="selectOption" value={name} onChange={handleChange}>
            <option value="">Select name</option>
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier.first_name}>
                {supplier.first_name}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
export default SearchByContact;