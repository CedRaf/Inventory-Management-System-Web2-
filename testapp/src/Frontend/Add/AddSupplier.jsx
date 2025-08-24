import React from "react";

function AddSupplier({ addSupplier, setNewSupplier, newSupplier }) {
    
    const handleReload = () =>{
        window.location.reload(); 
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addSupplier(newSupplier);
        handleReload();
    };

    return (
        <form onSubmit={handleSubmit}>
             <input type="text" name="supplier_name" placeholder="Enter Supplier Name" value={newSupplier.supplier_name || ''} onChange={handleChange} />
            <input type="text" name="first_name" placeholder="Enter First Name" value={newSupplier.first_name || ''} onChange={handleChange} />
            <input type="text" name="last_name" placeholder="Enter Last Name" value={newSupplier.last_name || ''} onChange={handleChange} />
            <input type="text" name="email" placeholder="Enter Email Address" value={newSupplier.email || ''} onChange={handleChange} />
            <input type="text" name="phone_number" placeholder="Enter Phone Number" value={newSupplier.phone_number || ''} onChange={handleChange} />
            <input type="text" name="bank_acc_no" placeholder="Enter Bank Account Number" value={newSupplier.bank_acc_no || ''} onChange={handleChange} />
            <input type="text" name="delivery_sched" placeholder="Enter Delivery Schedule" value={newSupplier.delivery_sched || ''} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddSupplier;
