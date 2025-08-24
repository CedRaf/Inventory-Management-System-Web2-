const authenticateToken = require("../middlewares/authenticateToken");
const database = require("../prisma/database"); 
const router = require("express").Router(); 

//get data of all orders
router.get("/", authenticateToken, async (request, response) => {
    try{
        const orders = await database.orders.findMany(); 
        return response.status(200).json({data:orders});  
    }catch(e){
        console.error('Error retrieving orders:', e); 
        return response.status(500).json({message : 'Server Error'}); 
    } 
});

//Joint table for display customer info, emp info, and order info
router.get("/orderDetails", [authenticateToken], async (request, response) => {
    try {
      const orders = await database.orders.findMany({
        select: {
          orderID: true,
          customer: {
            select: {
              customerID: true,
              first_name: true,
              last_name: true,
              phone_number: true,
            },
          },
          product: {
            select: {
              productID: true,
              product_type: true,
              thickness: true,
              color: true,
            },
          },
          amount_ordered: true,
          process_date: true,
          shipment_date: true,
          employee: {
            select: {
              employeeID: true,
              first_name: true,
              last_name: true,
            },
          },
          order_status: true,
        },
        orderBy: {
          orderID: 'asc',
        },
      });
  
      if (orders.length === 0) {
        return response.status(404).json({ message: 'Unable to retrieve order details' });
      }
  
      return response.status(200).json({ data: orders });
    } catch (e) {
      console.error('Error retrieving order information', e);
      return response.status(500).json({ message: 'Server Error' });
    }
  });

//sort by PROCESS date ASCENDING
router.get("/orderDetails/pdate-ASC", [authenticateToken], async (request, response) => {
    try {
      const orders = await database.orders.findMany({
        select: {
          orderID: true,
          customer: {
            select: {
              customerID: true,
              first_name: true,
              last_name: true,
              phone_number: true,
            },
          },
          product: {
            select: {
              productID: true,
              product_type: true,
              thickness: true,
              color: true,
            },
          },
          amount_ordered: true,
          process_date: true,
          shipment_date: true,
          employee: {
            select: {
              employeeID: true,
              first_name: true,
              last_name: true,
            },
          },
          order_status: true,
        },
        orderBy: {
          process_date: 'asc',
        },
      });
  
      if (orders.length === 0) {
        return response.status(404).json({ message: 'Unable to retrieve order details' });
      }
  
      return response.status(200).json({ data: orders });
    } catch (e) {
      console.error('Error retrieving order information', e);
      return response.status(500).json({ message: 'Server Error' });
    }
  });  

//sort by PROCESS date DESCENDING
router.get("/orderDetails/pdate-DESC",[authenticateToken], async (request, response) => {
    try {
        const orders = await database.orders.findMany({
          select: {
            orderID: true,
            customer: {
              select: {
                customerID: true,
                first_name: true,
                last_name: true,
                phone_number: true,
              },
            },
            product: {
              select: {
                productID: true,
                product_type: true,
                thickness: true,
                color: true,
              },
            },
            amount_ordered: true,
            process_date: true,
            shipment_date: true,
            employee: {
              select: {
                employeeID: true,
                first_name: true,
                last_name: true,
              },
            },
            order_status: true,
          },
          orderBy: {
            process_date: 'desc',
          },
        });
    
        if (orders.length === 0) {
          return response.status(404).json({ message: 'Unable to retrieve order details' });
        }
        return response.status(200).json({ data: orders });
      } catch (e) {
        console.error('Error retrieving order information', e);
        return response.status(500).json({ message: 'Server Error' });
      }
});

//sort by SHIPMENT DATE ASCENDING
router.get("/orderDetails/sdate-ASC", [authenticateToken], async (request, response) => {
    try {
      const orders = await database.orders.findMany({
        select: {
          orderID: true,
          customer: {
            select: {
              customerID: true,
              first_name: true,
              last_name: true,
              phone_number: true,
            },
          },
          product: {
            select: {
              productID: true,
              product_type: true,
              thickness: true,
              color: true,
            },
          },
          amount_ordered: true,
          process_date: true,
          shipment_date: true,
          employee: {
            select: {
              employeeID: true,
              first_name: true,
              last_name: true,
            },
          },
          order_status: true,
        },
        orderBy: {
          shipment_date: 'asc',
        },
      });
  
      if (orders.length === 0) {
        return response.status(404).json({ message: 'Unable to retrieve order details' });
      }
  
      return response.status(200).json({ data: orders });
    } catch (e) {
      console.error('Error retrieving order information', e);
      return response.status(500).json({ message: 'Server Error' });
    }
  });

//sort by SHIPMENT date DESCENDING
router.get("/orderDetails/sdate-DESC",[authenticateToken], async (request, response) => {
    try {
        const orders = await database.orders.findMany({
          select: {
            orderID: true,
            customer: {
              select: {
                customerID: true,
                first_name: true,
                last_name: true,
                phone_number: true,
              },
            },
            product: {
              select: {
                productID: true,
                product_type: true,
                thickness: true,
                color: true,
              },
            },
            amount_ordered: true,
            process_date: true,
            shipment_date: true,
            employee: {
              select: {
                employeeID: true,
                first_name: true,
                last_name: true,
              },
            },
            order_status: true,
          },
          orderBy: {
            shipment_date: 'desc',
          },
        });
    
        if (orders.length === 0) {
          return response.status(404).json({ message: 'Unable to retrieve order details' });
        }
        return response.status(200).json({ data: orders });
      } catch (e) {
        console.error('Error retrieving order information', e);
        return response.status(500).json({ message: 'Server Error' });
      }
});

//search order by STATUS (COMPLETED, PENDING, CANCELLED)
router.get("/orderDetails/status/:status", [authenticateToken], async (request, response) => {
    const status = request.params.status;
    try {
      const orders = await database.orders.findMany({
        where: {
          order_status: status,
        },
        select: {
          orderID: true,
          customer: {
            select: {
              customerID: true,
              first_name: true,
              last_name: true,
              phone_number: true,
            },
          },
          product: {
            select: {
              productID: true,
              product_type: true,
              thickness: true,
              color: true,
            },
          },
          amount_ordered: true,
          process_date: true,
          shipment_date: true,
          employee: {
            select: {
              employeeID: true,
              first_name: true,
              last_name: true,
            },
          },
          order_status: true,
        },
        orderBy: {
          process_date: 'asc',
        },
      });
  
      if (orders.length === 0) {
        return response.status(404).json({ message: 'Unable to retrieve order details' });
      }
  
      return response.status(200).json({ data: orders });
    } catch (e) {
      console.error('Error retrieving order information', e);
      return response.status(500).json({ message: 'Server Error' });
    }
  });


//add a new order
router.post("/", [authenticateToken], async (request, response) => {
    try {
      const customerID = Number(request.body.customerID);
      const productID = Number(request.body.productID);
      const employeeID = Number(request.body.employeeID);
      const amount_ordered = Number(request.body.amount_ordered);
      const {process_date, shipment_date, order_status } = request.body;

      const process = new Date(process_date); 
      const shipment = new Date(shipment_date); 

      const newOrder = await database.orders.create({
        data: {
          customerID: customerID,
          productID: productID,
          employeeID: employeeID,
          amount_ordered: amount_ordered,
          process_date: process,
          shipment_date: shipment,
          order_status: order_status,
        },
      });
  
      return response.status(201).json({ message: "Added new order.", data: newOrder });
    } catch (e) {
      console.error('Error adding order:', e);
      return response.status(500).json({ message: 'Server Error' });
    }
  });

//removing order
router.delete("/:id", [authenticateToken], async(request, response) => {
    const orderID = Number(request.params.id);
    try {
      const deletedOrder = await database.orders.delete({
        where: {
          orderID: orderID,
        },
      });
  
      if (!deletedOrder) {
        return response.status(404).json({ message: "Unable to remove order" });
      }
  
      return response.status(200).json({ message: "Removed order" });
    } catch (e) {
      console.error('Unable to remove order:', e);
      return response.status(500).json({ message: 'Server Error' });
    }
  });


//update an order
//order status can is pending by default and SHOULD only be set to either pending, cancelled, completed
router.patch("/:id", [authenticateToken], async(request, response) => {  
    try {
      const orderID = Number(request.params.id);
      const customerID = Number(request.body.customerID);
      const productID = Number(request.body.productID);
      const employeeID = Number(request.body.employeeID);
      const amount_ordered = Number(request.body.amount_ordered);
      const {process_date, shipment_date, order_status } = request.body;
      const process = new Date(process_date);
      const shipment = new Date(shipment_date);
  
      const updatedOrder = await database.orders.update({
        where: {
          orderID: orderID,
        },
        data: {
          customerID: customerID,
          productID: productID,
          employeeID: employeeID,
          amount_ordered: amount_ordered,
          process_date: process,
          shipment_date: shipment,
          order_status: order_status,
        },
      });
  
      return response.status(200).json({ message: "Order details updated.", data: updatedOrder });
    } catch (error) {
      console.error('Error updating order details:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  });


module.exports = router;