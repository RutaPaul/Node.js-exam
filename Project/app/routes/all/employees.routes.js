const startEmployeesRoutes = (app) => {
    const employee = require("../../controllers/employee.controller.js");
    var router = require("express").Router();
    router.get("/", employee.findEmployees);
    router.get("/:id", employee.findEmployeeByID);

    app.use('/api/v1/employees', router);
}

module.exports = {
    startEmployeesRoutes
}