import React from "react";

function AddProduct({ addProduct, setNewProduct, newProduct }) {

    const handleReload = () =>{
        window.location.reload(); 
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(newProduct);
        handleReload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="supplierID" placeholder="Enter Supplier ID" value={newProduct.supplierID || ''} onChange={handleChange} />
            <input type="text" name="product_type" placeholder="Enter Product Type" value={newProduct.product_type || ''} onChange={handleChange} />
            <input type="text" name="thickness" placeholder="Enter Product Thickness" value={newProduct.thickness || ''} onChange={handleChange} />
            <input type="text" name="color" placeholder="Enter Product Color" value={newProduct.color || ''} onChange={handleChange} />
            <input type="text" name="product_quantity" placeholder="Enter Product Quantity" value={newProduct.product_quantity || ''} onChange={handleChange} />
            <input type="text" name="product_location" placeholder="Enter Product Location" value={newProduct.product_location || ''} onChange={handleChange} />
            <input type="date" name="last_shipment" placeholder="Enter Product's Last Shipment" value={newProduct.last_shipment || ''} onChange={handleChange} />
            <input type="text" name="amount_ordered" placeholder="Enter Product Amount Ordered" value={newProduct.amount_ordered || ''} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddProduct;
