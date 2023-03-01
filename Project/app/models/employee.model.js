const sql = require("./db.js");
const Employee = function(employee) {
    this.EmployeeID = employee.EmployeeID;
    this.LastName = employee.LastName;
    this.FirstName = employee.FirstName;
    this.Title = employee.Title;
    this.TitleOfCourtesy = employee.TitleOfCourtesy;
    this.BirthDate = employee.BirthDate;
    this.HireDate = employee.HireDate;
    this.Address = employee.Address;
    this.City = employee.City;
};

Employee.findEmployees = (id, result) => {

    let query = `SELECT * FROM EMPLOYEES`;
    if(id){
      query += ` WHERE EMPLOYEES.EmployeeID = ${id}`
    }
    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found employees: ", res);
          result(null, res);
          return;
        }

        result({ message: "not_found" }, null);
      });
};

Employee.insertEmployee = (newEmployee, result) => {
  sql.query("INSERT INTO EMPLOYEES SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.updateEmployee = (id, employee, result) => {
  sql.query(
    "UPDATE EMPLOYEES SET LastName = ?, FirstName = ?, Title = ?, TitleOfCourtesy = ?, BirthDate = ?, HireDate = ?, Address = ?, City = ? WHERE EmployeeID = ?",
    [employee.LastName, employee.FirstName, employee.Title, employee.TitleOfCourtesy, employee.BirthDate, employee.HireDate, employee.Address, employee.City, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
      }
    );
};

Employee.deleteEmployee = (id, result) => {
  
  let queryOrderDetails = `DELETE ORDER_DETAILS FROM ORDER_DETAILS 
  INNER JOIN ORDERS ON ORDERS.OrderID = ORDER_DETAILS.OrderID
  WHERE ORDERS.EmployeeID = ${id}`;
  sql.query(queryOrderDetails, (err, res)=>{
    if(err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted order details associated with employee`);

    let queryOrders = `DELETE ORDERS FROM ORDERS
    WHERE ORDERS.EmployeeID = ${id}`;
    sql.query(queryOrders, (err,res)=>{
      if(err){
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted orders associated with employee`);

      let queryEmployees = `DELETE FROM EMPLOYEES WHERE EmployeeID = ${id}`;
      sql.query(queryEmployees, (err,res)=>{
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
    
        console.log(`deleted employee with id: `, id);
        result(null, res);
      })
    })
  })
}





module.exports = Employee;