const express = require("express");
const routes = require("./routes");
const app = express();
const cors = require("cors"); 
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

app.use("/auth", routes.authRoute);
app.use("/products",routes.productsRoutes);
app.use("/customers", routes.customerRoutes); 
app.use("/employees", routes.empRoutes);
app.use("/supplier", routes.suppRoutes);  
app.use("/orders", routes.orderRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));