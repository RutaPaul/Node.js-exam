const Order = require("../models/order.model.js");
const OrderDetail = require("../models/orderDetail.model.js");
const MainController = require("./main.controller.js");

exports.findOrders = (req, res) => {
    Order.findOrders(null, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found any orders`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving orders"
              });
            }
          } else {
            res.send(data);
          };
    });
};

exports.findOrderByID = (req, res) => {
  Order.findOrders(req.params.id, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Order with ID: ${req.params.id} was not found`
            });
          } else {
            res.status(500).send({
              message: `Error retrieving order with ID: ${req.params.id}`
            });
          }
        } else {
          res.send(data);
        };
  });
};

exports.insertOrder = (req, res) => {
  MainController.ValidateRequest(req, res);

  const order = new Order({
    CustomerID: req.body.CustomerID,
    EmployeeID: req.body.EmployeeID,
    OrderDate: new Date()
  });

  Order.insertOrder(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new order."
      });
    else res.send(data);
  });
};

exports.updateOrder = (req, res) => {
  MainController.ValidateRequest(req, res);

  Order.updateOrder(
    req.params.id,
    new Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating order with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteOrder = (req, res) => {
  OrderDetail.deleteOrderDetail(req.params.id, "OrderID", (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting order."
      });
    else{
      Order.deleteOrder(req.params.id, (err, data) => {
        MainController.HandleResponse(req, res, err, "Order");
      })
    } 
  })
};


