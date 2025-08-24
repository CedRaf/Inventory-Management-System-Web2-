import React, { useState, useEffect } from 'react';



function UpdateSupplier({ updateSupplier, supplier, setSupplier }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
       updateSupplier(supplier);
      setSupplier({
        supplier_name: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        bank_acc_no: '',
        delivery_sched: ''
      });
    } catch (error) {
      setError('Unable to update supplier details');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="supplier_name"
          placeholder="Enter new First Name"
          value={supplier.supplier_name || ''}
          onChange={handleChange}
        />
        <input 
          type="text"
          name="first_name"
          placeholder="Enter new First Name"
          value={supplier.first_name || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Enter new Last Name"
          value={supplier.last_name || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Enter new Email Address"
          value={supplier.email || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Enter new Phone Number"
          value={supplier.phone_number || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bank_acc_no"
          placeholder="Enter new Bank Account Number"
          value={supplier.bank_acc_no || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="delivery_sched"
          placeholder="Enter new Delivery Schedule"
          value={supplier.delivery_sched || ''}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateSupplier;
