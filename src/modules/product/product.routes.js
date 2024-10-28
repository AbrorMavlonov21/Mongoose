const { Router } = require("express");
const { productController } = require("../product/product.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { roleMiddleware } = require("../../middlewares/role.middleware");
const { setRole } = require("../../lib/setRole");


const router = Router();

router.get("/", productController.getAll.bind(productController));
router.post("/create",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
productController.createProduct.bind(productController));
router.put("/update/:id",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
productController.updateProduct.bind(productController));
router.delete("/delete/:id", 
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
productController.deleteProduct.bind(productController));

module.exports = { router };