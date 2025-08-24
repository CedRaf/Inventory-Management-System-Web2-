import React, { useState, useEffect } from 'react';



function UpdateOrder({ updateOrder, order, setOrder }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateOrder(order);
      setOrder({
          customerID: '',
          productID: '',
          employeeID: '',
          process_date: '',
          shipment_date: '',
          order_status: '',

      });
    } catch (error) {
      setError('Unable to update order');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="customerID"
          placeholder="Enter new customer ID"
          value={order.customerID || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="productID"
          placeholder="Enter new Product ID"
          value={order.productID || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="employeeID"
          placeholder="Enter new Employee ID"
          value={order.employeeID || ''}
          onChange={handleChange}
        />
        <input
          type="date"
          name="process_date"
          placeholder="Enter new Process Date"
          value={order.process_date || ''}
          onChange={handleChange}
        />
        <input
          type="date"
          name="shipment_date"
          placeholder="Enter new Shipment Date"
          value={order.shipment_date || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="order_status"
          placeholder="Enter new Order Status"
          value={order.order_status || ''}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateOrder;
