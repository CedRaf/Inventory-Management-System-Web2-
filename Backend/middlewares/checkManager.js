const checkManager = (request, response, next) => {
  
      const userType = request.user.emp_type;

      if (userType !== "Manager") {
        return response.status(403).json({ message: `Unauthorized access - User type '${userType}' is not allowed'` });
      }

      next();

  };


module.exports = checkManager;

