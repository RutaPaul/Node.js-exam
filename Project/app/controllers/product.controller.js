
const Product = require("../models/product.model.js");

exports.findProducts = (req, res) => {
  Product.findProducts(null, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found any products`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving products"
            });
          }
        } else {
          res.send(data);
        };
  });
};

exports.findProductByID = (req, res) => {
    Product.findProducts(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Product with ID: ${req.params.id} was not found`
              });
            } else {
              res.status(500).send({
                message: `Error retrieving product with ID: ${req.params.id}`
              });
            }
          } else {
            res.send(data);
          };
    });
};
