const OrderDetail = require("../models/orderDetail.model.js");
const MainController = require("./main.controller.js");

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
  MainController.ValidateRequest(req, res);

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

exports.updateOrderDetail = (req, res) => {
  MainController.ValidateRequest(req, res);

  OrderDetail.updateOrderDetail(
    req.params.id,
    new OrderDetail(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order Detail with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Order Detail with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteOrderDetail = (req, res) => {
  OrderDetail.deleteOrderDetail(req.params.id, req.params.deleteBy, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting order detail."
      });
    else{
      res.send({ message: `Order detail was deleted successfully!` });
    }
})
}
