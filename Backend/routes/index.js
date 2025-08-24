const productsRoutes = require("./productsRoutes");
const authRoute = require("./authRoutes");
const customerRoutes = require("./customerRoutes");
const empRoutes = require("./employeeRoutes"); 
const suppRoutes = require("./supplierRoutes");
const orderRoutes = require("./orderRoutes");

module.exports = {
  productsRoutes,
  authRoute,
  customerRoutes, 
  empRoutes,
  suppRoutes, 
  orderRoutes,
};
