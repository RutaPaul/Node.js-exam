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

exports.insertOrderDetail = (req, res) => {
  ValidateRequest(req, res);

  const orderDetail = new OrderDetail({
    OrderID: req.body.OrderID,
    ProductID: req.body.ProductID,
    UnitPrice: req.body.UnitPrice,
    Quantity: req.body.Quantity,
    Discount: req.body.Discount
  });

  OrderDetail.insertOrderDetail(orderDetail, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new order detail."
      });
    else res.send(data);
  });
};

function ValidateRequest(req, res) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  };
};