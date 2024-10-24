const { Router } = require("express");
const categoryRoutes = require("./category/category.routes");
const userRoutes = require("./user/user.routes");
const productRoutes = require("./product/product.routes")

const router = Router();

router.use("/category", categoryRoutes.router);
router.use("/user", userRoutes.router);
router.use("/product", productRoutes.router)

module.exports = { router };
