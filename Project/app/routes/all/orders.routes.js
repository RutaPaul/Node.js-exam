const startOrdersRoutes = (app) => {
    const order = require("../../controllers/order.controller.js");
    var router = require("express").Router();
    router.get("/", order.findOrders);
    router.get("/:id", order.findOrderByID);
    router.post("/", order.insertOrder);
    

    app.use('/api/v1/orders', router);
}

module.exports = {
    startOrdersRoutes
}