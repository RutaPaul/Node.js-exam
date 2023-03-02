const startOrdersRoutes = (app) => {
    const order = require("../../controllers/order.controller.js");
    var router = require("express").Router();
    router.get("/", order.findOrders);
    router.get("/order/:id", order.findOrderByID);
    router.get("/:id", order.getOrder);
    router.post("/", order.insertOrder);
    router.patch("/:id", order.updateOrder);
    router.delete("/:id", order.deleteOrder);
    app.use('/api/v1/orders', router);
};

module.exports = {
    startOrdersRoutes
};