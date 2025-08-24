const authKey = () => (request, response, next) => {
    const empKey = request.headers["EmployeeKey"];
    const pass = '1234@abc'; 
    if(empKey !== pass){
        return response.status(404).json({message : "Unauthorized Access"}); 
    }
    next(); 
  };
  
  module.exports = authKey; 