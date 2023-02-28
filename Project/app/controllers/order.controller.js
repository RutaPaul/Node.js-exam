const Order = require("../models/order.model.js");

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
  ValidateRequest(req, res);

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
  ValidateRequest(req, res);

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

function ValidateRequest(req, res) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  };
};