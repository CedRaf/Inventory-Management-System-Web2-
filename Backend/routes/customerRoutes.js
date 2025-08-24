const authenticateToken = require("../middlewares/authenticateToken");
const checkManager = require("../middlewares/checkManager");
const router = require("express").Router();
const database = require("../prisma/database"); 


//get data of all customers
router.get("/", [authenticateToken], async (request, response) => {
    try {
        const customers = await database.customer.findMany({
            orderBy: {
                customerID: 'asc',
            },
        });
        return response.status(200).json({ data: customers });
    } catch (e) {
        console.error('Error retrieving customers:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//get data of single customers

router.get("/:id", [authenticateToken], async (request, response) => {
    const customerID = Number(request.params.id);
    try {
        const foundCust = await database.customer.findUnique({
            where: {
                customerID: customerID,
            },
        });
        if (!foundCust) {
            return response.status(404).json({ message: "Customer not found" });
        }

        return response.status(200).json({ data: foundCust });

    } catch (e) {
        console.error('Error retrieving customer:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//get data of customers via name
router.get("/name/:searchTerm", [authenticateToken], async (request, response) => {
    const searchTerm = request.params.searchTerm;
    const names = searchTerm.split(' ');
    try {
        let foundCustomers;
        
        if (names.length === 1) {
            foundCustomers = await database.customer.findMany({
                where: {
                    OR: [
                        {
                            first_name: searchTerm
                        },
                        {
                            last_name: searchTerm
                        }
                    ]
                },
            });
        } else if (names.length === 2) {
            foundCustomers = await database.customer.findMany({
                where: {
                    first_name: names[0],
                    last_name: names[1]
                },
            });
        } else if (names.length === 3) {
            foundCustomers = await database.customer.findMany({
                where: {
                    first_name: `${names[0]} ${names[1]}`,
                    last_name: names[2]
                },
            });
        }

        if (foundCustomers.length === 0) {
            return response.status(404).json({ message: "No customers found with the specified name" });
        }

        return response.status(200).json({ data: foundCustomers });

    } catch (e) {
        console.error('Error retrieving customers:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//post new customers
router.post("/", [authenticateToken], async (request, response) => {
    try {
        const { first_name, last_name, email_address, phone_number, home_address } = request.body;

        const newCustomer = await database.customer.create({
            data: {
                first_name,
                last_name,
                email_address,
                phone_number,
                home_address,
            },
        });

        return response.status(201).json({ message: "Successfully added new customer.", data: newCustomer });
    } catch (e) {
        console.error('Error adding new customer:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//delete a customers
router.patch("/delete/:id", [authenticateToken], async (request, response) => {
    const customerID = Number(request.params.id);
    const nullVals = {
        first_name: "DELETED",
        last_name: "DELETED",
        email_address: "DELETED",
        phone_number: "DELETED",
        home_address: "DELETED",
    };
    try {
        const updatedCustomer = await database.customer.update({
            where: {
                customerID: customerID,
            },
            data: nullVals,
        });

        if (!updatedCustomer) {
            return response.status(404).json({ message: "Customer Not Found" });
        }

        return response.status(200).json({ message: "Successfully removed customer" });
    } catch (e) {
        console.error('Error removing customer:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//update a customers
router.patch("/:id", [authenticateToken], async (request, response) => {
    const customerID = Number(request.params.id);
    try {
        const { first_name, last_name, email_address, phone_number, home_address } = request.body;

        const updatedCustomer = await database.customer.update({
            where: {
                customerID: customerID,
            },
            data: {
                first_name,
                last_name,
                email_address,
                phone_number,
                home_address,
            },
        });

        if (!updatedCustomer) {
            return response.status(404).json({ message: "Customer not found" });
        }

        return response.status(200).json({ message: "Customer Information successfully updated." });
    } catch (error) {
        console.error('Error updating customer:', error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;