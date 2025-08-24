import React, { useState, useEffect } from 'react';



function UpdateEmployee({ updateEmployee, employee, setEmployee }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateEmployee(employee);
      setEmployee({
        first_name: '',
        last_name: '',
        birth_date: '',
        address: '',
        gender: '',
        phone_number: '',
        emp_type: '',
        password: ''
      });
    } catch (error) {
      setError('Unable to update employee');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="first_name"
          placeholder="Enter new First Name"
          value={employee.first_name || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Enter new last name"
          value={employee.last_name || ''}
          onChange={handleChange}
        />
        <input
          type="date"
          name="birth_date"
          placeholder="Enter new birthdate"
          value={employee.birth_date || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Enter new address"
          value={employee.address || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Enter new gender"
          value={employee.gender || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Enter new phone number"
          value={employee.phone_number || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emp_type"
          placeholder="Enter new employee type"
          value={employee.emp_type || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emp_email"
          placeholder="Enter new employee type"
          value={employee.emp_email || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Enter new password"
          value={employee.password || ''}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
