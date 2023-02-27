const sql = require("./db.js");
const Product = function(product) {

}

Product.findProductByID = (id, result) => {

    let query = `SELECT * FROM products
    WHERE products.ProductID = ${id}`
    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found product: ", res[0]);
          result(null, res[0]);
          return;
        }
        
        result({ message: "not_found" }, null);
      });
}

Product.findProducts = (result) => {

    let query = `SELECT * FROM products`
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
}

module.exports = Product;