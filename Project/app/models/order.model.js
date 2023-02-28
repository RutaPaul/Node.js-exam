const sql = require("./db.js");
const Order = function(order) {
    this.OrderID = order.OrderID;
    this.CustomerID = order.CustomerID;
    this.EmployeeID = order.EmployeeID;
    this.OrderDate = order.OrderDate;
};

Order.findOrders = (id, result) => {

    let query = `SELECT * FROM ORDERS`;
    if(id){
      query += ` WHERE ORDERS.OrderID = ${id}`
    }
    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found orders: ", res);
          result(null, res);
          return;
        }

        result({ message: "not_found" }, null);
      });
}

Order.insertOrder = (newOrder, result) => {
  sql.query("INSERT INTO ORDERS SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
}

Order.updateOrder = (id, order, result) => {
  sql.query(
    "UPDATE ORDERS SET CustomerID = ?, EmployeeID = ?, OrderDate = ? WHERE OrderID = ?",
    [order.CustomerID, order.EmployeeID, order.OrderDate, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order: ", { id: id, ...order });
      result(null, { id: id, ...order });
      }
    );
  };



module.exports = Order;