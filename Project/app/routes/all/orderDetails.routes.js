const startOrderDetailsRoutes = (app) => {
    const orderDetail = require("../../controllers/orderDetail.controller.js");
    var router = require("express").Router();
    router.get("/", orderDetail.findOrderDetails);
    router.get("/:id", orderDetail.findOrderDetailByOrderID);
    router.post("/", orderDetail.insertOrderDetail);
    

    app.use('/api/v1/orderDetails', router);
}

module.exports = {
    startOrderDetailsRoutes
}