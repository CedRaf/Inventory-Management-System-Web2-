import React from "react";

function AddCustomer({ addCustomer, setNewCustomer, newCustomer }) {
    const handleReload = () =>{
        window.location.reload(); 
    }
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCustomer(newCustomer);
        handleReload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" placeholder="Enter First Name" value={newCustomer.first_name || ''} onChange={handleChange} />
            <input type="text" name="last_name" placeholder="Enter Last Name" value={newCustomer.last_name || ''} onChange={handleChange} />
            <input type="text" name="email_address" placeholder="Enter Email Address" value={newCustomer.email_address || ''} onChange={handleChange} />
            <input type="text" name="phone_number" placeholder="Enter Phone Number" value={newCustomer.phone_number || ''} onChange={handleChange} />
            <input type="text" name="home_address" placeholder="Enter Home Address" value={newCustomer.home_address || ''} onChange={handleChange} />

            <button type="submit">Add</button>
        </form>
    );
}

export default AddCustomer;
