const Employee = require("../models/employee.model.js");

exports.findEmployees = (req, res) => {
    Employee.findEmployees(null, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found any employees`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving employees"
              });
            }
          } else {
            res.send(data);
          };
    });
};

exports.findEmployeeByID = (req, res) => {
  Employee.findEmployees(req.params.id, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Employee with ID: ${req.params.id} was not found`
            });
          } else {
            res.status(500).send({
              message: `Error retrieving employee with ID: ${req.params.id}`
            });
          }
        } else {
          res.send(data);
        };
  });
};
