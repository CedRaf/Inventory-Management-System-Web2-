import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AddProduct from './Add/AddProduct';
import UpdateProduct from './Update/UpdateProduct';
import './css/ProductList.css';
import { useNavigate } from 'react-router-dom';
import SearchLocation from './SearchBars/Products/SearchLocation';
import SearchName from './SearchBars/Products/SearchName';
import logo from './images/companyLogo.png';


function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate= useNavigate();
  const [newProduct, setNewProduct] = useState({
    supplierID: '',
    product_type: '',
    thickness: '',
    color: '',
    product_quantity: '',
    product_location: '',
    last_shipment: '',
    amount_ordered: ''
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(''); 
  const [user, setUser] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantitySort, setQuantitySort]= useState(null);
  const [resetSort, setResetSort]= useState(null);

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

    const getProducts = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(result.data.data); 
      } catch (error) {
        setError('Unable to fetch products');
      }
    };

    if (token && user) {
      getProducts();
    }
  }, [token]);

  const deleteProduct = async (productId) => {
    try {
      await axios.patch(
        `http://localhost:3000/products/delete/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user: user, 
          },
        }
      );

      const result = await axios.get(`http://localhost:3000/products/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(result.data.data); 
      handleReload();

    } catch (error) {
      setError('Unable to delete product.');
    }
  };
  
  const addProduct = async (newProductData) => {
    try {
      const newProd = await axios.post('http://localhost:3000/products/', newProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, 
        },
      });
      setProducts([...products, newProd.data]); 
    } catch (error) {
      setError('Unable to add product');  
    }
  };

  const updateProduct = async (newProductData) => {
    try {
      await axios.patch(`http://localhost:3000/products/${newProductData.productID}`, newProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user: user, 
        },
      });
      const updatedProductsList = products.map(product => {
        if (product.productID === newProductData.productID) {
          
          return { ...product, ...newProductData };
        }
        return product; 
      });
    
      
      setProducts(updatedProductsList);
      
    } catch (error) {
      setError('Unable to update product');
    }
  };
  const handleUpdateClick = (product) => {
    toggleUpdate();
    setSelectedProduct(product);

  };

  const handleQuantitySort = async() => {
    setQuantitySort(prevSort => !prevSort);
    if(quantitySort === true){
      try {
        const result = await axios.get(`http://localhost:3000/products/sortASC`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(result.data.data);
      } catch (error) {
        setError('Unable to fetch sorted products');
      }
    }
    else if(quantitySort === false){
      try {
        const result = await axios.get(`http://localhost:3000/products/sortDESC`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(result.data.data);
      } catch (error) {
        setError('Unable to fetch sorted products');
      }
    };
    }
    
    const resetSortHandle= async() => {
      setResetSort(prevSort => !prevSort); 
      if(resetSort === true || resetSort === false){
        try {
          const result = await axios.get(`http://localhost:3000/products/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(result.data.data);
        } catch (error) {
          setError('Unable to fetch default products');
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
              <SearchLocation products={products} setProducts= {setProducts} user={user} setError = {setError} error={error} token={token} />
              <SearchName products={products} setProducts= {setProducts} user={user} setError = {setError} error={error} token={token} />
              <button onClick={handleQuantitySort}>Toggle Quantity Sort</button>
              </div>
            
              <button className="Default" onClick={resetSortHandle}>Default View</button> 
            </div>
            <div className= "AddProduct">
              <h3><button onClick={toggleAdd}>Add a product</button></h3>
              {showAdd && (
              <AddProduct addProduct={addProduct} setNewProduct={setNewProduct} newProduct={newProduct} />
              )}
            </div>
            {showUpdate && (
              <UpdateProduct updateProduct={updateProduct} setProduct={setSelectedProduct} product= {selectedProduct}/>
            )}
            <h4 id="Title">Product Information</h4>
            <table >
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Supplier ID</th>
                  <th>Product Type</th>
                  <th>Thickness</th>
                  <th>Color</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Last Shipment</th>
                  <th>Amount Ordered</th>
                  <th>Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.productID}>
                    <td>{product.productID}</td>
                    <td>{product.supplierID}</td>
                    <td>{product.product_type}</td>
                    <td>{product.thickness}</td>
                    <td>{product.color}</td>
                    <td>{product.product_quantity}</td>
                    <td>{product.product_location}</td>
                    <td>{product.last_shipment}</td>
                    <td>{product.amount_ordered}</td>
                    <td>
                      <button onClick={() => deleteProduct(product.productID)}>Delete</button>
                      <button onClick={() => handleUpdateClick(product)}>Update</button>
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

export default ProductList;
