const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(403).json({ message: "Unauthorized access" });
  }

  jwt.verify(token, 'admin', (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Invalid Token" });
    }
    

    const userType = user.emp_type; 
    
    if (userType !== "Employee" && userType !== "Manager") {
      return response.status(403).json({ message: `Unauthorized access - User type '${userType}' is not allowed` });
    }

    request.user = user; 

    next();

  });
};

module.exports = authenticateToken;
