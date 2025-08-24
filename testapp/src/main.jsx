import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Frontend/Login.jsx'
import Register from './Frontend/Register.jsx'
import ManagerOrder from './Frontend/ManageOrders.jsx'
import ProductList from './Frontend/ProductList.jsx'
import EmployeeList from './Frontend/EmployeeList.jsx'
import CustomerList from './Frontend/CustomerList.jsx'
import SupplierList from './Frontend/SupplierList.jsx'
import AddProduct from './Frontend/Add/AddProduct.jsx'
import UpdateProduct from './Frontend/Update/UpdateProduct.jsx'
import AddOrder from './Frontend/Add/AddOrder'
import UpdateOrder from './Frontend/Update/UpdateOrder'
import AddEmployee from './Frontend/Add/AddEmployee'
import UpdateEmployee from './Frontend/Update/UpdateEmployee'
import AddCustomer from './Frontend/Add/AddCustomer'
import UpdateCustomer from './Frontend/Update/UpdateCustomer'
import AddSupplier from './Frontend/Add/AddSupplier'
import UpdateSupplier from './Frontend/Update/UpdateSupplier'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/manage-order',
    element: <ManagerOrder/>
  },
  {
    path: '/product-information',
    element: <ProductList/>
  },
  {
    path: '/employee-information',
    element: <EmployeeList/>
  },
  {
    path: '/customer-information',
    element: <CustomerList/>
  },
  {
    path: '/supplier-information',
    element: <SupplierList/>
  },
  {
    path: '/add-product',
    element: <AddProduct/>
  },
  {
    path: '/update-product/:productId',
    element: <UpdateProduct/>
  },
  {
    path: '/add-order',
    element: <AddOrder/>
  },
  {
    path: '/update-order/:orderId',
    element: <UpdateOrder/>
  },
  {
    path: '/add-employee',
    element: <AddEmployee/>
  },
  {
    path: '/update-employee/:employeeId',
    element: <UpdateEmployee/>
  },
  {
    path: '/add-customer',
    element: <AddCustomer/>
  },
  {
    path: '/update-customer/:supplierId',
    element: <UpdateCustomer/>
  },
  {
    path: '/add-supplier',
    element: <AddSupplier/>
  },
  {
    path: '/update-supplier/:supplierId',
    element: <UpdateSupplier/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
