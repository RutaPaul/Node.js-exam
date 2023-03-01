const Employee = require("../models/employee.model.js");
const MainController = require("./main.controller.js");

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

exports.insertEmployee = (req, res) => {
  MainController.ValidateRequest(req, res);

  const employee = new Employee({
    EmployeeID: req.body.EmployeeID,
    LastName: req.body.LastName,
    FirstName: req.body.FirstName,
    Title: req.body.Title,
    TitleOfCourtesy: req.body.TitleOfCourtesy,
    BirthDate: req.body.BirthDate,
    HireDate: req.body.HireDate,
    Address: req.body.Address,
    City: req.body.City
  });

  Employee.insertEmployee(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating new employee."
      });
    else res.send(data);
  });
};

exports.updateEmployee = (req, res) => {
  MainController.ValidateRequest(req, res);

  Employee.updateEmployee(
    req.params.id,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found employee with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating employee with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteEmployee = (req, res) => {
  Employee.deleteEmployee(req.params.id, (err, data) => {
    MainController.HandleResponse(req, res, err, "Employee");
  })
};
