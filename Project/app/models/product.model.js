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

Product.insertProduct = (newProduct, result) => {
  sql.query("INSERT INTO PRODUCTS SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.updateProduct = (id, product, result) => {
  sql.query(
    "UPDATE PRODUCTS SET ProductName = ?, SupplierID = ?, CategoryID = ?, QuantityPerUnit = ?, UnitPrice = ? WHERE ProductID = ?",
    [product.ProductName, product.SupplierID, product.CategoryID, product.QuantityPerUnit, product.UnitPrice, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
      }
    );
};

Product.deleteProduct = (id, result) => {
  sql.query(`DELETE FROM PRODUCTS WHERE ProductID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted product with id: `, id);
    result(null, res);
  });
}
  
module.exports = Product;