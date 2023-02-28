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
