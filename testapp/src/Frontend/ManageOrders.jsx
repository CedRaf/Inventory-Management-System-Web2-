import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AddOrder from './Add/AddOrder';
import UpdateOrder from './Update/UpdateOrder';
import './css/ProductList.css';
import { useNavigate } from 'react-router-dom';
import SearchStatus from './SearchBars/Orders/SearchStatus';
import logo from './images/companyLogo.png';
function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    orderID: '',
    customerID: '',
    productID: '',
    employeeID: '',
    process_date: '',
    shipment_date: '',
    amount_ordered: '',
});
  const [error, setError] = useState(null);
  const [token, setToken] = useState(''); 
  const [user, setUser] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [shipmentSort, setShipmentSort]= useState(null);
  const [processSort, setProcessSort]= useState(null);
  const [resetSort, setResetSort]= useState(null);
  const navigate = useNavigate();
  const handleReload = () => {
    window.location.reload();
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserParsed = JSON.parse(storedUser);

    if (storedToken && storedUserParsed) {
      setToken(storedToken);
      setUser(storedUserParsed);
    }
  }, []);

  useEffect(() => {

   
    const getOrders = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/orders/orderDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user: user, 
          },
        });
        setOrders(result.data.data);
      } catch (error) {
        setError('Unable to fetch Orders');
      }
    };

    if (token && user) {
      getOrders();
    }
  }, [token]);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user,
        },
      });
  
      const updatedOrders = orders.filter(order => order.orderID !== orderId);
      setOrders(updatedOrders);
      handleReload();
    }catch (error) {
      setError('Unable to delete Order.');
    }
  };

  const addOrder = async (newOrderData) => {
    try {
      const newProd = await axios.post('http://localhost:3000/orders/', newOrderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, 
        },
      });
      setOrders([...prevOrders, newOrderData]);
    } catch (error) {
      setError('Unable to add Order');
    }
  };

  const updateOrder = async (newOrderData) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${newOrderData.orderID}`, newOrderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, 
        },
      });
      const updatedOrdersList = orders.map(order => {
        if (order.orderID === newOrderData.orderID) {
          
          return { ...order, ...newOrderData };
        }
        return order; 
      });
    
      
      setOrders(updatedOrdersList);
    } catch (error) {
      setError('Unable to add product');
    }
  };
  const handleUpdateClick = (order) => {
    toggleUpdate();
    setSelectedOrder(order);
  };
  

  const handleProcessSort = async() => {
    setProcessSort(prevSort => !prevSort); 
    if(processSort === true){
      try {
        const result = await axios.get(`http://localhost:3000/orders/orderDetails/pdate-ASC`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(result.data.data);
      } catch (error) {
        setError('Unable to fetch sorted process orders');
      }
    }
    else if(processSort === false){
      try {
        const result = await axios.get(`http://localhost:3000/orders/orderDetails/pdate-DESC`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(result.data.data);
      } catch (error) {
        setError('Unable to fetch sorted process orders');
      }
    };
    }

    const handleShipmentSort = async() => {
      setShipmentSort(prevSort => !prevSort); // Toggle the state between true and false
      if(shipmentSort === true){
        try {
          const result = await axios.get(`http://localhost:3000/orders/orderDetails/sdate-ASC`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrders(result.data.data);
        } catch (error) {
          setError('Unable to fetch sorted shipment orders');
        }
      }
      else if(shipmentSort === false){
        try {
          const result = await axios.get(`http://localhost:3000/orders/orderDetails/sdate-DESC`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrders(result.data.data);
        } catch (error) {
          setError('Unable to fetch sorted shipment orders');
        }
      };
      }

      const resetSortHandle= async() => {
        setResetSort(prevSort => !prevSort); // Toggle the state between true and false
        if(resetSort === true || resetSort === false){
          try {
            const result = await axios.get(`http://localhost:3000/orders/orderDetails`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setOrders(result.data.data);
          } catch (error) {
            setError('Unable to fetch default orders');
          }
        }
      }


    const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
      }

      const [showAdd,setShowAdd] = useState(null);
      const toggleAdd = (e) => {
        setShowAdd(prevShowAdd => !prevShowAdd);
      }
      const [showUpdate,setShowUpdate] = useState(null);
      const toggleUpdate = (e) => {
        setShowUpdate(prevShowUpdate => !prevShowUpdate);
      }

  return (
    
    <div className="product-page-container">
      {error && <p>{error}</p>}

      <div className="header">
          <div className="companyLogo">
            <img src ={logo}></img>
          </div>
          <div className="Logout">
            <button onClick={handleLogout}>Log Out</button>
          </div>
      </div>

    <div className="product-body">
      <div className="leftMain"> <Sidebar /></div>
      <div className="rightMain">
        <div className="SearchBars">
        <div className="notDefault">
          <SearchStatus orders={orders} setOrders= {setOrders} user={user} setError = {setError} error={error} token={token} />
          <button onClick={handleProcessSort}>Toggle Process Date Sort</button>
          <button onClick={handleShipmentSort}>Toggle Shipment Date Sort</button>
        </div>
        <button className="Default" onClick={resetSortHandle}>Default View</button> 
        </div>

        <div className= "AddProduct">
          <h3><button onClick={toggleAdd}>Add an order</button></h3>
                  {showAdd && (
                  <AddOrder addOrder={addOrder} setNewOrder={setNewOrder} newOrder={newOrder} />
          )}
          
        </div>
        {showUpdate && (
          <UpdateOrder updateOrder={updateOrder} setOrder={setSelectedOrder} order= {selectedOrder}/>
        )}
        <h4 id="Title">Manage Orders</h4>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              
              <th>Customer First Name</th>
              <th>Customer Last Name</th>
              <th>Phone Number</th>
             
              <th>Product Type</th>
              <th>Product Thickness</th>
              <th>Product Color</th>
              <th>Amount Ordered</th>
              <th>Process Date</th>
              <th>Shipment Date</th>
          
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(order => (
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                
                <td>{order.customer.first_name}</td>
                <td>{order.customer.last_name}</td>
                <td>{order.customer.phone_number}</td>
                
                <td>{order.product.product_type}</td>
                <td>{order.product.thickness}</td>
                <td>{order.product.color}</td>
                <td>{order.amount_ordered}</td>
                <td>{order.process_date}</td>
                <td>{order.shipment_date}</td>
               
                <td>{order.employee.first_name}</td>
                <td>{order.employee.last_name}</td>
                <td>{order.order_status}</td>
                <td>
                  <button onClick={() => deleteOrder(order.orderID)}>Delete</button>
                  <button onClick={() => handleUpdateClick(order)}>Update</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

      </div>
    </div>
    </div>
  );
}

export default ManageOrder;
