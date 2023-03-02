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
  };
  sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      };
  
      if (res.length) {
        console.log("found orders: ", res);
        result(null, res);
        return;
      };

      result({ message: "not_found" }, null);
    });
};

Order.getOrderEmployees = (id, result) => {
  let queryEmployees= `SELECT * FROM EMPLOYEES e 
  INNER JOIN ORDERS o ON e.EmployeeID = o.EmployeeID 
  WHERE o.OrderID = ${id}`;
  sql.query(queryEmployees, (err, res)=>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return;
    };
    if(res && res.length!=0){
      result(null, res);
    };
  });
};

Order.getOrderProducts = (id, result) => {
  let queryProducts = `SELECT * FROM PRODUCTS p 
  INNER JOIN ORDER_DETAILS od ON p.ProductID = od.ProductID 
  WHERE od.OrderID = ${id}`
  sql.query(queryProducts, (err, res)=>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return;
    };
    if(res && res.length!=0){
      result(null, res);
    };
  });
};

Order.getOrder = (id, result) => {
  let queryOrderDetails = `SELECT od.OrderID, od.UnitPrice , od.Quantity, od.Discount FROM ORDERS o 
  INNER JOIN ORDER_DETAILS od ON o.OrderID = od.OrderID 
  WHERE o.OrderID = ${id}`;
  sql.query(queryOrderDetails, (err, res)=>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return;
    };
    if(res && res.length!=0){
      result(null, res);
    };
  });
};

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
};

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

Order.deleteOrder = (id, result) => {
  sql.query(`DELETE FROM ORDERS WHERE OrderID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted order with id: `, id);
    result(null, res);
  });
};

module.exports = Order;