import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AddSupplier from './Add/AddSupplier';
import UpdateSupplier from './Update/UpdateSupplier';
import './css/ProductList.css';
import { useNavigate } from 'react-router-dom';
import SearchByContact from './SearchBars/Supplier/SearchByContact';
import SearchSchedule from './SearchBars/Supplier/SearchSchedule';
import logo from './images/companyLogo.png';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier  , setNewSupplier] = useState({
    supplier_name: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    bank_acc_no: '',
    delivery_sched: ''
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(''); 
  const [user, setUser] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
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


    const getSuppliers = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/supplier/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user: user, 
          },
        });
        setSuppliers(result.data.data);
      } catch (error) {
        setError('Unable to fetch Supplier List');
      }
    };
    if (token && user) {
    getSuppliers();
    }
  }, [token]);

  const deleteSupplier = async (supplierId) => {
    try {
      await axios.patch(`http://localhost:3000/supplier/delete/${supplierId}`, null, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
        },
      });


      handleReload();
    } catch (error) {
      setError('Unable to delete supplier.');
    }
  };

  const addSupplier = async (newSupplierData) => {
    try {
      const newProd = await axios.post('http://localhost:3000/supplier/', newSupplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, 
        },
      });
      setSuppliers([...suppliers, newSupplierData]);
    } catch (error) {
      setError('Unable to add supplier');
    }
  };

  const updateSupplier = async (newSupplierData) => {
    try {
      await axios.patch(`http://localhost:3000/supplier/${newSupplierData.supplierID}`, newSupplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, 
        },
      });
      const updatedSupplierList = suppliers.map(supplier => {
        if (supplier.supplierID === newSupplierData.supplierID) {
          // Update the specific product that matches the condition
          return { ...supplier, ...newSupplierData };
        }
        return supplier; // Return unchanged products
      });
    
      // Set the updated products list in the state
      setSuppliers(updatedSupplierList);
    } catch (error) {
      setError('Unable to add supplier');
    }
  };
  const handleUpdateClick = (supplier) => {
    toggleUpdate();
    setSelectedSupplier(supplier);
  };
  
  const resetSortHandle= async() => {
    setResetSort(prevSort => !prevSort); // Toggle the state between true and false
    if(resetSort === true || resetSort === false){
      try {
        const result = await axios.get(`http://localhost:3000/supplier/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user: user, 
          },
        });
        setSuppliers(result.data.data);
      } catch (error) {
        setError('Unable to fetch default suppliers');
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
            <SearchByContact suppliers={suppliers} setSuppliers= {setSuppliers} user={user} setError = {setError} error={error} token={token} />
            <SearchSchedule suppliers={suppliers} setSuppliers= {setSuppliers} user={user} setError = {setError} error={error} token={token} />
            </div>
            <button className="Default" onClick={resetSortHandle}>Default View</button> 
          </div>
          <div className= "AddProduct">
              <h3><button onClick={toggleAdd}>Add a supplier</button></h3>
                  {showAdd && (
                  <AddSupplier addSupplier={addSupplier} setNewSupplier={setNewSupplier} newSupplier={newSupplier} />
              )}
          </div>
          {showUpdate && (
          <UpdateSupplier updateSupplier={updateSupplier} setSupplier={setSelectedSupplier} supplier= {selectedSupplier}/>
        )}
             <h4 id="Title">Supplier Information</h4>
           
          
        <table>
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Supplier Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Bank Account Number</th>
              <th>Delivery Schedule</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.supplierID}>
                <td>{supplier.supplierID}</td>
                <td>{supplier.supplier_name}</td>
                <td>{supplier.first_name}</td>
                <td>{supplier.last_name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone_number}</td>
                <td>{supplier.bank_acc_no}</td>
                <td>{supplier.delivery_sched}</td>
     
                <td>
                  <button onClick={() => deleteSupplier(supplier.supplierID)}>Delete</button>
                  <button onClick={() => handleUpdateClick(supplier)}>Update</button>
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

export default SupplierList;
