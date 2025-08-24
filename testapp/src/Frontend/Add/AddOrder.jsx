import React from "react";

function AddOrder({  addOrder, setNewOrder, newOrder}) {
  
  const handleReload = () =>{
    window.location.reload(); 
  }
  
  const handleChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrder(newOrder);
        handleReload(); 
    };

    return (
        <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="customerID"
          placeholder="Enter new customer ID"
          value={newOrder.customerID || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="productID"
          placeholder="Enter new Product ID"
          value={newOrder.productID || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="employeeID"
          placeholder="Enter new Employee ID"
          value={newOrder.employeeID || ''}
          onChange={handleChange}
        />
        <input
          type="date"
          name="process_date"
          placeholder="Enter new Process Date"
          value={newOrder.process_date || ''}
          onChange={handleChange}
        />
        <input
          type="date"
          name="shipment_date"
          placeholder="Enter new Shipment Date"
          value={newOrder.shipment_date || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="order_status"
          placeholder="Enter new Order Status"
          value={newOrder.order_status || ''}
          onChange={handleChange}
        />
       <input
          type="text"
          name="amount_ordered"
          placeholder="Enter Order Amount"
          value={newOrder.amount_ordered || ''}
          onChange={handleChange}
        />
        <button type="submit">Order</button>
        </form>
    );
}

export default AddOrder;
