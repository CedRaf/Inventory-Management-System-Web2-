import React, { useState, useEffect } from 'react';
import axios from 'axios';
function SearchName({ products, setProducts, user, error, setError, token }) {
    const [name, setName] = useState('');
    const [tempProducts, setTempProducts] = useState('')
    const handleChange = (e) => {
      setName(e.target.value);
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      getProductsByName(name);
      
    };
  
    const getProductsByName = async(name) => {
        try {
            const result = await axios.get(`http://localhost:3000/products/name/${name}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });

            setProducts(result.data.data);
          } catch (error) {
            setError('Unable to find product name');
          }
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="selectOption">Select a name:</label>
          <select id="selectOption" value={name} onChange={handleChange}>
            <option value="">Select name</option>
            {products.map((product, index) => (
              <option key={index} value={product.product_type}>
                {product.product_type}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
export default SearchName;