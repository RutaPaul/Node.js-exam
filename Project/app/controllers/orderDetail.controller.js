const OrderDetail = require("../models/orderDetail.model.js");

exports.findOrderDetails = (req, res) => {
    OrderDetail.findOrderDetails(null, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found any order details`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving order details"
              });
            }
          } else {
            res.send(data);
          };
    });
};

exports.findOrderDetailByOrderID = (req, res) => {
  OrderDetail.findOrderDetails(req.params.id, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Order Detail with order ID: ${req.params.id} was not found`
            });
          } else {
            res.status(500).send({
              message: `Error retrieving order detail with order ID: ${req.params.id}`
            });
          }
        } else {
          res.send(data);
        };
  });
};
