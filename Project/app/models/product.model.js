const sql = require("./db.js");
const Product = function(product) {
  this.ProductID = product.ProductID;
  this.ProductName = product.ProductName;
  this.SupplierID = product.SupplierID;
  this.CategoryID = product.CategoryID;
  this.QuantityPerUnit = product.QuantityPerUnit;
  this.UnitPrice = product.UnitPrice;
};

Product.findProducts = (id, result) => {

  let query = `SELECT * FROM PRODUCTS`;
  if(id){
    query += ` WHERE PRODUCTS.ProductID = ${id}`
  }
  sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found products: ", res);
        result(null, res);
        return;
      }

      result({ message: "not_found" }, null);
    });
};


module.exports = Product;