const startProductsRoutes = (app) => {

    const product = require("../../controllers/product.controller.js");
    var router = require("express").Router();
    router.get("/", product.findProducts);
    router.get("/:id", product.findProductByID);
    router.post("/", product.insertProduct);
    router.patch("/:id", product.updateProduct);
    router.delete("/:id", product.deleteProduct);
    app.use('/api/v1/products', router);
}

module.exports = {
    startProductsRoutes
}