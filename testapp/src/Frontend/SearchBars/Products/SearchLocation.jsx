import React, { useState, useEffect } from 'react';
import axios from 'axios';
function SearchLocation({ products, setProducts, user, error, setError, token }) {
    const [location, setLocation] = useState('');
    const [tempProducts, setTempProducts] = useState('')
    const handleChange = (e) => {
      setLocation(e.target.value);
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      getProductsByLocation(location);
      
    };
  
    const getProductsByLocation = async(location) => {
        try {
            const result = await axios.get(`http://localhost:3000/products/location/${location}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              
            });
            setProducts(result.data.data);
          } catch (error) {
            setError('Unable to find product name');
          }
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="selectOption">Select a location:</label>
          <select id="selectOption" value={location} onChange={handleChange}>
            <option value="">Select location</option>
            {products.map((product, index) => (
              <option key={index} value={product.product_location}>
                {product.product_location}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
export default SearchLocation;