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
};

OrderDetail.insertOrderDetail = (newOrderDetail, result) => {
  sql.query("INSERT INTO ORDER_DETAILS SET ?", newOrderDetail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order detail: ", { id: res.insertId, ...newOrderDetail });
    result(null, { id: res.insertId, ...newOrderDetail });
  });
};

OrderDetail.updateOrderDetail = (id, orderDetail, result) => {
  sql.query(
    "UPDATE ORDER_DETAILS SET ProductID = ?, UnitPrice = ?, Quantity = ?, Discount = ? WHERE OrderID = ?",
    [orderDetail.ProductID, orderDetail.UnitPrice, orderDetail.Quantity, orderDetail.Discount, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found order detail with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order detail: ", { id: id, ...orderDetail });
      result(null, { id: id, ...orderDetail });
      }
    );
};

OrderDetail.deleteOrderDetail = (id, deleteBy, result) => {
  sql.query(`DELETE FROM ORDER_DETAILS WHERE ${deleteBy} = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted order detail with ${deleteBy}: `, id);
    result(null, res);
  });
};

module.exports = OrderDetail;