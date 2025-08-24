const router = require("express").Router();
const jwt = require("jsonwebtoken");
const database = require("../prisma/database"); 
const bcrypt = require("bcrypt"); 

//used for password hashing
const saltRounds = 10; 

router.post("/register", async (request, response) => {
  try {
    const { first_name, last_name, birth_date, address, gender, phone_number, emp_type, emp_email, password } = request.body;

    const newDate = new Date(birth_date);
    const hashPass = await bcrypt.hash(password, saltRounds);

    const newUser = await database.employee.create({
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

    response.status(201).json({ message: "Successfully registered as a new employee.", newUser });

  } catch (e) {
    console.error('Error adding new employee:', e);
    response.status(500).json({ message: 'Server Error' });
  }
});

router.post("/login", async (request, response) => {
  try {
    const employeeID = Number(request.body.employeeID); 
    const password = request.body.password;

    const user = await database.employee.findUnique({
      where: {
        employeeID: employeeID,
      },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(400).json({ message: "Invalid Password." });
    }

    const token = jwt.sign({ employeeID: user.employeeID, emp_type: user.emp_type }, "admin", {
      expiresIn: 86400,
    });

    response.status(200).json({
      user: { employeeID: user.employeeID, emp_type: user.emp_type },
      accessToken: token,
    });

  } catch (e) {
    console.error('Error during login:', e);
    response.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

