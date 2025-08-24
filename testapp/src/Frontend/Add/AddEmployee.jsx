import React from "react";

function AddEmployee({ addEmployee, setNewEmployee, newEmployee }) {
  
    const handleReload = () => {
      window.location.reload();
    }  
  
  const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(newEmployee);
        handleReload();
    };

    return (
        <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="first_name"
          placeholder="Enter new First Name"
          value={newEmployee.first_name || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Enter new last name"
          value={newEmployee.last_name || ''}
          onChange={handleChange}
        />
        <input
          type="date"
          name="birth_date"
          placeholder="Enter new birthdate"
          value={newEmployee.birth_date || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Enter new address"
          value={newEmployee.address || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Enter new gender"
          value={newEmployee.gender || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Enter new phone number"
          value={newEmployee.phone_number || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emp_type"
          placeholder="Enter new employee type"
          value={newEmployee.emp_type || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emp_email"
          placeholder="Enter new email"
          value={newEmployee.emp_email || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Enter new password"
          value={newEmployee.password || ''}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    );
}

export default AddEmployee;
