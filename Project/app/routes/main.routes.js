const startRoutes = (app) => {
    const {startOrdersRoutes} = require("./all/orders.routes.js");
    const {startProductsRoutes} = require("./all/products.routes.js");
    const {startEmployeesRoutes} = require("./all/employees.routes.js");
    const {startOrderDetailsRoutes} = require("./all/orderDetails.routes.js");

    startOrdersRoutes(app);
    startProductsRoutes(app);
    startEmployeesRoutes(app);
    startOrderDetailsRoutes(app);
};

module.exports = {
    startRoutes
};