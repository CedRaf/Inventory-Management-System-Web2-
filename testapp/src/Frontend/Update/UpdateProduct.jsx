import React, { useState, useEffect } from 'react';



function UpdateProduct({ updateProduct, product, setProduct }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
       updateProduct(product);
      setProduct({
        supplierID: '',
        product_type: '',
        thickness: '',
        color: '',
        product_quantity: '',
        product_location: '',
        last_shipment: '',
        amount_ordered: '',
      });
    } catch (error) {
      setError('Unable to update product');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input 
          type="text"
          name="supplierID"
          placeholder="Enter new supplier ID"
          value={product.supplierID || ''}
          onChange={handleChange}
        />
        <input 
          type="text"
          name="product_type"
          placeholder="Enter new Type"
          value={product.product_type || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="thickness"
          placeholder="Enter new Thickness"
          value={product.thickness || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="color"
          placeholder="Enter new Color"
          value={product.color || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="product_quantity"
          placeholder="Enter new Quantity"
          value={product.product_quantity || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="product_location"
          placeholder="Enter new Location"
          value={product.product_location || ''}
          onChange={handleChange}
        />
        <input
          type="date"
          name="last_shipment"
          placeholder="Enter new last shipment date"
          value={product.last_shipment || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amount_ordered"
          placeholder="Enter new amount ordered"
          value={product.amount_ordered || ''}
          onChange={handleChange}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
