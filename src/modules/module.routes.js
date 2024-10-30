const { Router } = require("express");
const categoryRoutes = require("./category/category.routes");
const userRoutes = require("./user/user.routes");
const productRoutes = require("./product/product.routes");
const authRoutes = require("./auth/auth.routes");
const korzinkaRoutes = require("./korzinka/korzinka.routes");

const router = Router();

router.use("/category", categoryRoutes.router);
router.use("/user", userRoutes.router);
router.use("/product", productRoutes.router);
router.use("/auth", authRoutes.router);
router.use("/korzinka", korzinkaRoutes.router)

module.exports = { router };
