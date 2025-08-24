import React, { useState, useEffect } from 'react';



function UpdateCustomer({ updateCustomer, customer, setCustomer }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
       updateCustomer(customer);
      setCustomer({
        first_name: '',
        last_name: '',
        email_address: '',
        phone_number: '',
        home_address: '',
      });
    } catch (error) {
      setError('Unable to update customer');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="first_name"
          placeholder="Enter new first name"
          value={customer.first_name || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Enter new last name"
          value={customer.last_name || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email_address"
          placeholder="Enter new email address"
          value={customer.email_address || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Enter new phone number"
          value={customer.phone_number || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="home_address"
          placeholder="Enter new Home Address"
          value={customer.home_address || ''}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
