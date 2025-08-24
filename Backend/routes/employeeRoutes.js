const authenticateToken = require("../middlewares/authenticateToken");
const checkManager = require("../middlewares/checkManager"); 
const router = require("express").Router();
const database = require("../prisma/database"); 
const bcrypt = require("bcrypt"); 

//for password hashing
const saltRounds = 10;

//get data of all employees
router.get("/", [authenticateToken, checkManager], async (request, response) => {
    try {
        const employees = await database.employee.findMany();
        return response.status(200).json({ data: employees });
    } catch (e) {
        console.error('Error retrieving employees:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//get data of single employees
router.get("/:id", [authenticateToken, checkManager], async (request, response) => {
    const employeeID = Number(request.params.id);
    try {
        const foundEmp = await database.employee.findUnique({
            where: {
                employeeID: employeeID,
            },
        });

        if (!foundEmp) {
            return response.status(404).json({ message: "Employee not found" });
        }

        return response.status(200).json({ data: foundEmp });

    } catch (e) {
        console.error('Error retrieving employee:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//get data of employee via name
router.get("/name/:searchTerm", [authenticateToken, checkManager], async (request, response) => {
    const searchTerm = request.params.searchTerm;
    const names = searchTerm.split(' ');
    try {
        let foundEmp;

        if (names.length === 1) {
            foundEmp = await database.employee.findMany({
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
            foundEmp = await database.employee.findMany({
                where: {
                    first_name: names[0],
                    last_name: names[1]
                },
            });
        } else if (names.length === 3) {
            foundEmp = await database.employee.findMany({
                where: {
                    first_name: `${names[0]} ${names[1]}`,
                    last_name: names[2]
                },
            });
        }

        if (foundEmp.length === 0) {
            return response.status(404).json({ message: "No employee found with the specified name" });
        }

        return response.status(200).json({ data: foundEmp });

    } catch (e) {
        console.error('Error retrieving employees:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//display employees by position
router.get("/position/:position", [authenticateToken, checkManager], async (request, response) => {
    const position = request.params.position;
    try {
        const foundEmp = await database.employee.findMany({
            where: {
                emp_type: position,
            },
        });

        if (foundEmp.length === 0) {
            return response.status(404).json({ message: "No employees with the specified position" });
        }

        return response.status(200).json({ data: foundEmp });

    } catch (e) {
        console.error('Error retrieving employees', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//display emp by gender
router.get("/gender/:gender", [authenticateToken, checkManager], async (request, response) => {
    const gender = request.params.gender;
    try {
        const foundEmp = await database.employee.findMany({
            where: {
                gender: gender,
            },
        });

        if (foundEmp.length === 0) {
            return response.status(404).json({ message: "No employees with the specified gender" });
        }

        return response.status(200).json({ data: foundEmp });

    } catch (e) {
        console.error('Error retrieving employees', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//display emp by bday
router.get("/bday/:bday", [authenticateToken, checkManager], async (request, response) => {
    const bday = request.params.bday;
    try {
        const foundEmp = await database.employee.findMany({
            where: {
                birth_date: bday,
            },
        });

        if (foundEmp.length === 0) {
            return response.status(404).json({ message: "No employees with the specified birth date" });
        }

        return response.status(200).json({ data: foundEmp });

    } catch (e) {
        console.error('Error retrieving employees', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});
//post new employee
router.post("/", async (request, response) => {
    try {
        const { first_name, last_name, birth_date, address, gender, phone_number, emp_type, emp_email, password } = request.body;

        const hashPass = await bcrypt.hash(password, saltRounds);
        const newDate = new Date(birth_date); 

        const newEmployee = await database.employee.create({
            data: {
                first_name,
                last_name,
                birth_date: newDate,
                address,
                gender,
                phone_number,
                emp_type,
                emp_email,
                password: hashPass,
            },
        });

        return response.status(201).json({ message: "Successfully added new employee.", data: newEmployee });
    } catch (e) {
        console.error('Error adding new employee:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});

//delete an employee (setting all fields except ID and password to "DELETED")
router.patch("/delete/:id", [authenticateToken, checkManager], async (request, response) => {
    const employeeID = Number(request.params.id);
    try {
        const nullVals = {
            address: "DELETED",
            gender: "DELETED",
            phone_number: "DELETED",
            emp_type: "DELETED",
            emp_email: null,
        };

        const updatedEmployee = await database.employee.update({
            where: {
                employeeID: employeeID,
            },
            data: nullVals,
        });

        if (!updatedEmployee) {
            return response.status(404).json({ message: "Employee Not Found" });
        }

        return response.status(200).json({ message: "Successfully removed employee" });
    } catch (e) {
        console.error('Error removing employee:', e);
        return response.status(500).json({ message: 'Server Error' });
    }
});


//update an employee
router.patch("/:id", [authenticateToken, checkManager], async (request, response) => {
    try {
        const employeeID = Number(request.params.id);
        const { first_name, last_name, birth_date, address, gender, phone_number, emp_type, emp_email, password } = request.body;

        const hashPass = await bcrypt.hash(password, saltRounds);
        const newDate = new Date(birth_date); 

        const updatedEmployee = await database.employee.update({
            where: {
                employeeID: employeeID,
            },
            data: {
                first_name,
                last_name,
                birth_date: newDate,
                address,
                gender,
                phone_number,
                emp_type,
                emp_email,
                password: hashPass,
            },
        });

        return response.status(200).json({ message: "Employee Information successfully updated.", data: updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;