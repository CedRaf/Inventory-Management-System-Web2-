const authenticateToken = require("../middlewares/authenticateToken");
const checkManager = require("../middlewares/checkManager");
const router = require("express").Router();
const database = require("../prisma/database"); 

//get data of all products (sorted by ID)
router.get("/", [authenticateToken], async (request, response) => {
    try {
        const products = await database.product.findMany();
        return response.status(200).json({ data: products });
    } catch (e) {
        console.error('Error retrieving products:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//get products sorted ASC by quantity
router.get("/sortASC", [authenticateToken], async (request, response) => {
    try {
        const foundProduct = await database.product.findMany({
            orderBy: {
                product_quantity: 'asc'
            },
        });

        if (foundProduct.length === 0) {
            return response.status(404).json({ message: "Items not found" });
        }

        return response.status(200).json({ data: foundProduct });

    } catch (e) {
        console.error('Error retrieving product:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//get products sorted DESC by quantity
router.get("/sortDESC", [authenticateToken], async (request, response) => {
    try {
        const foundProduct = await database.product.findMany({
            orderBy: {
                product_quantity: 'desc'
            },
        });

        if (foundProduct.length === 0) {
            return response.status(404).json({ message: "Item not found" });
        }

        return response.status(200).json({ data: foundProduct });

    } catch (e) {
        console.error('Error retrieving product:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//get data of single product
router.get("/:id", [authenticateToken], async (request, response) => {
    const productID = Number(request.params.id);
    try {
        const foundProduct = await database.product.findUnique({
            where: {
                productID: productID,
            },
        });

        if (!foundProduct) {
            return response.status(404).json({ message: "Item not found" });
        }

        return response.status(200).json({ data: foundProduct });

    } catch (e) {
        console.error('Error retrieving product:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//get product by name
router.get("/name/:name", [authenticateToken], async (request, response) => {
    const prod_name = request.params.name;
    try {
        const foundProduct = await database.product.findMany({
            where: {
                product_type: prod_name,
            },
        });

        if (foundProduct.length === 0) {
            return response.status(404).json({ message: "Item not found" });
        }

        return response.status(200).json({ data: foundProduct });

    } catch (e) {
        console.error('Error retrieving product:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//get products per location
router.get("/location/:location", [authenticateToken], async (request, response) => {
    const location = request.params.location;
    try {
        const foundProduct = await database.product.findMany({
            where: {
                product_location: location,
            },
        });

        if (foundProduct.length === 0) {
            return response.status(404).json({ message: 'No products in given location' });
        }

        return response.status(200).json({ data: foundProduct });

    } catch (e) {
        console.error('Error retrieving product location:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//post new product
router.post("/", [authenticateToken, checkManager], async (request, response) => {
    try {
        
        const supplierID = Number(request.body.supplierID);
        const thickness = Number(request.body.thickness);
        const product_quantity = Number(request.body.product_quantity);
        const amount_ordered = Number(request.body.amount_ordered);

        const { product_type, color, product_location, last_shipment } = request.body;

        const newDate = new Date(last_shipment);

        const newProduct = await database.product.create({
            data: {
                supplierID,
                product_type,
                thickness,
                color,
                product_quantity,
                product_location,
                last_shipment: newDate,
                amount_ordered,
            },
        });

        return response.status(201).json({ message: "Successfully added new product.", data: newProduct });
    } catch (e) {
        console.error('Error adding new product:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//delete a product
router.patch("/delete/:id", [authenticateToken, checkManager], async (request, response) => {
    const productID = Number(request.params.id);
    try {
        const updatedProduct = await database.product.update({
            where: {
                productID: productID,
            },
            data: {
                product_type: "DELETED",
                thickness: 0,
                color: "DELETED",
                product_quantity: 0,
                product_location: "DELETED",
                amount_ordered: 0,
            },
        });

        if (!updatedProduct) {
            return response.status(404).json({ message: "Unable to delete product" });
        }

        return response.status(200).json({ message: "Successfully deleted product" });
    } catch (e) {
        console.error('Error deleting new product:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//update a product
router.patch("/:id", [authenticateToken, checkManager], async (request, response) => {
    const productID = Number(request.params.id);
    try {
        const supplierID = Number(request.body.supplierID);
        const thickness = Number(request.body.thickness);
        const product_quantity = Number(request.body.product_quantity);
        const amount_ordered = Number(request.body.amount_ordered);
        
        const { product_type, color, product_location, last_shipment} = request.body;
        const newDate = new Date(last_shipment);

        const updatedProduct = await database.product.update({
            where: {
                productID: productID,
            },
            data: {
                supplierID,
                product_type,
                thickness,
                color,
                product_quantity,
                product_location,
                last_shipment: newDate,
                amount_ordered,
            },
        });

        return response.status(200).json({ message: "Product successfully updated.", data: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
