
const Product = require("../models/product.model.js");
const OrderDetail = require("../models/orderDetail.model.js");
const MainController = require("./main.controller.js");

exports.findProducts = (req, res) => {
  Product.findProducts(null, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({message: `Not found any products`});
      } else {
        res.status(500).send({message: "Error retrieving products"});
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
        res.status(404).send({message: `Product with ID: ${req.params.id} was not found`});
      } else {
        res.status(500).send({message: `Error retrieving product with ID: ${req.params.id}`});
      }
    } else {
      res.send(data);
    };
  });
};

exports.insertProduct = (req, res) => {
  MainController.ValidateRequest(req, res);

  const product = new Product({
    ProductID: req.body.ProductID,
    ProductName: req.body.ProductName,
    SupplierID: req.body.SupplierID,
    CategoryID: req.body.CategoryID,
    QuantityPerUnit: req.body.QuantityPerUnit,
    UnitPrice: req.body.UnitPrice
  });

  Product.insertProduct(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:err.message || "Some error occurred while creating new product."
      });
    else res.send(data);
  });
};

exports.updateProduct = (req, res) => {
  MainController.ValidateRequest(req, res);

  Product.updateProduct(
    req.params.id,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({ message: `Not found Product with id ${req.params.id}.`});
        } else {
          res.status(500).send({message: "Error updating Product with id " + req.params.id});
        }
      } else res.send(data);
    }
  );
};

exports.deleteProduct = (req, res) => {
  OrderDetail.deleteOrderDetail(req.params.id, "ProductID", (err, data) => {
    if (err)
      res.status(500).send({message: err.message || "Some error occurred while deleting product."});
    else{
      Product.deleteProduct(req.params.id, (err, data) => {
        MainController.HandleResponse(req, res, err, "Product");
      });
    };
  });
};

