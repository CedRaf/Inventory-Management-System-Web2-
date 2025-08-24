import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AddCustomer from './Add/AddCustomer';
import UpdateCustomer from './Update/UpdateCustomer';
import './css/ProductList.css';
import { useNavigate } from 'react-router-dom';
import SearchByName from './SearchBars/Customer/SearchByName'
import logo from './images/companyLogo.png';


function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    first_name: '',
    last_name: '',
    email_address: '',
    phone_number: '',
    home_address:'',
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(''); 
  const [user, setUser] = useState(''); 
  const [selectedCustomer, setSelectedCustomer] = useState('');
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


    const getCustomers = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/customers/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setCustomers(result.data.data);
      } catch (error) {
        setError('Unable to fetch Customer');
      }
    };

    getCustomers();
  }, [token]);

  const deleteCustomer = async (CustomerId) => {
    try {
      const result = await axios.patch(`http://localhost:3000/customers/delete/${CustomerId}`, 
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, 
        },
      });

      handleReload();
    } catch (error) {
      alert(error);
    } 
  };

  const addCustomer = async (newCustomerData) => {
    try {
      const newCust = await axios.post('http://localhost:3000/customers/', newCustomerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, 
        },
      });
      setCustomers([...customers, newCustomerData]);
    } catch (error) {
      setError('Unable to add Customer');
    }
  };

  const updateCustomer = async (newCustomerData) => {
    try {
      await axios.patch(`http://localhost:3000/customers/${newCustomerData.customerID}`, newCustomerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
      const updatedCustomerList = customers.map(customer => {
        if (customer.customerID === newCustomerData.customerID) {
          // Update the specific product that matches the condition
          return { ...customer, ...newCustomerData };
        }
        return customer; // Return unchanged products
      });
    
      // Set the updated products list in the state
      setCustomers(updatedCustomerList);
    } catch (error) {
      setError('Unable to add Customer');
    }
  };
  const handleUpdateClick = (customer) => {
    toggleUpdate();
    setSelectedCustomer(customer);
  };
  
  const resetSortHandle= async() => {
    setResetSort(prevSort => !prevSort); // Toggle the state between true and false
    if(resetSort === true || resetSort === false){
      try {
        const result = await axios.get(`http://localhost:3000/customers/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user: user, 
          },
        });
        setCustomers(result.data.data);
      } catch (error) {
        setError('Unable to fetch default customers');
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
            <SearchByName customers={customers} setCustomers= {setCustomers} user={user} setError = {setError} error={error} token={token} />
            </div>

            <button className="Default" onClick={resetSortHandle}>Default View</button> 
          </div>

          <div className= "AddProduct">
            <h3><button onClick={toggleAdd}>Add a customer</button></h3>
                {showAdd && (
                <AddCustomer addCustomer={addCustomer} setNewCustomer={setNewCustomer} newCustomer={newCustomer} />
            )}
          </div>
          {showUpdate && (
          <UpdateCustomer updateCustomer={updateCustomer} setCustomer={setSelectedCustomer} customer= {selectedCustomer}/>
        )}
        <h4 id="Title">Customer Information</h4>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Home Address</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.customerID}>
                <td>{customer.customerID}</td>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.email_address}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.home_address}</td>

                <td>
                  <button onClick={() => deleteCustomer(customer.customerID)}>Delete</button>
                  <button onClick={() => handleUpdateClick(customer)}>Update</button>
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

export default CustomerList;
