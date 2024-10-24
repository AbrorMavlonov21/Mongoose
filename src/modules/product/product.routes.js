const { Router } = require("express");
const { productController } = require("../product/product.controller");

const router = Router();

router.get("/", productController.getAll.bind(productController));
router.post("/create", productController.createProduct.bind(productController));
router.put("/update/:id", productController.updateProduct.bind(productController));
router.delete("/delete/:id", productController.deleteProduct.bind(productController));

module.exports = { router };