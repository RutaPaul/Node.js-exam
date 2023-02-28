const sql = require("./db.js");
const OrderDetail = function(orderDetail) {
    this.OrderID = orderDetail.OrderID;
    this.ProductID = orderDetail.ProductID;
    this.UnitPrice = orderDetail.UnitPrice;
    this.Quantity = orderDetail.Quantity;
    this.Discount = orderDetail.Discount;
};

OrderDetail.findOrderDetails = (orderID, result) => {

    let query = `SELECT * FROM ORDER_DETAILS`;
    if(orderID){
      // retrieve order details by order ID
      query += ` WHERE ORDER_DETAILS.OrderID = ${orderID}`
    }
    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found order details: ", res);
          result(null, res);
          return;
        }

        result({ message: "not_found" }, null);
      });
}







module.exports = OrderDetail;