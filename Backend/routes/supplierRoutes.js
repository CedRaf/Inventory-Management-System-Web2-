const authenticateToken = require("../middlewares/authenticateToken");
const checkManager = require("../middlewares/checkManager"); 
const router = require("express").Router();
const database = require("../prisma/database"); 

//get data of supplier
router.get("/", [authenticateToken, checkManager],  async (request, response) => {
    try{
        const suppliers = await database.supplier.findMany();
        return response.status(200).json({data : suppliers}); 
    }catch(e){
        console.error('Error retrieving products:', e); 
        return response(500).json({message : 'Server Error'}); 
    } 
});

//search by delivery schedule
router.get("/sched/:searchTerm", [authenticateToken, checkManager], async (request, response) => {
    const sched = request.params.searchTerm; 
    try{
        const suppliers = await database.supplier.findMany({
            where: {
                delivery_sched : sched
            },
        });
        return response.status(200).json({data : suppliers});
    }catch(e){
        console.error('Error retrieving products:', e); 
        return response(500).json({message : 'Server Error'}); 
    } 
});

//search by contact person name
router.get('/name/:searchTerm', [authenticateToken, checkManager], async (request, response) => {
    const searchTerm = request.params.searchTerm;
    const names = searchTerm.split(' ');
    try {
        let foundCustomers;

        if (names.length === 1) {
            foundCustomers = await database.supplier.findMany({
                where: {
                    OR: [
                        { first_name: searchTerm },
                        { last_name: searchTerm },
                    ],
                },
            });
        } else if (names.length === 2) {
            foundCustomers = await database.supplier.findMany({
                where: {
                    first_name: names[0],
                    last_name: names[1],
                },
            });
        } else if (names.length === 3) {
            foundCustomers = await database.supplier.findMany({
                where: {
                    first_name: `${names[0]} ${names[1]}`,
                    last_name: names[2],
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

//add a new supplier
router.post("/", [authenticateToken, checkManager], async (request, response) => {
    try {
        const {supplier_name, first_name, last_name, email, phone_number, bank_acc_no, delivery_sched } = request.body; 
        await database.supplier.create({
            data: {
                supplier_name,
                first_name, 
                last_name,
                email,
                phone_number,
                bank_acc_no,
                delivery_sched,
            },
        })
        return response.status(201).json({ message: "Added new supplier." });
      } catch (e) {
        console.error('Error adding supplier:', e);
        return response.status(500).json({ message: 'Server Error' });
      }

});

//removing supplier
router.patch('/delete/:id', [authenticateToken, checkManager], async (request, response) => {
    const supplierID = Number(request.params.id);
    const nullVals = {
        supplier_name: "DELETED",
        first_name: "DELETED",
        last_name: "DELETED",
        email: "DELETED",
        phone_number: "DELETED",
        bank_acc_no: "DELETED",
        delivery_sched: "DELETED",
    };
    try {
        
        const updatedSupplier = await database.supplier.update({
            where: {
                supplierID,
            },
            data: nullVals,
        });

        if (!updatedSupplier) {
            return response.status(404).json({ message: "Unable to remove supplier" });
        }

        return response.status(200).json({ message: "Removed supplier" });
    } catch (e) {
        console.error('Unable to remove supplier:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

// Update a supplier
router.patch('/:id', [authenticateToken, checkManager], async (request, response) => {
    try {
        const supplierID = Number(request.params.id);
        const { supplier_name, first_name, last_name, email, phone_number, bank_acc_no, delivery_sched } = request.body;
        await database.supplier.update({
            where: {
                supplierID,
            },
            data: {
                supplier_name,
                first_name,
                last_name,
                email,
                phone_number,
                bank_acc_no,
                delivery_sched,
            },
        });

        return response.status(200).json({ message: "Supplier information updated." });
    } catch (error) {
        console.error('Error updating supplier information:', error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;