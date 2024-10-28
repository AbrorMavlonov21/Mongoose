const { Router } = require("express");
const { categoryController } = require("./category.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { roleMiddleware } = require("../../middlewares/role.middleware");
const { setRole } = require("../../lib/setRole");


const router = Router();

router.get("/", categoryController.getAll.bind(categoryController));
router.post("/create",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin","worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
categoryController.createCategory.bind(categoryController));
router.put("/update/:id",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin","worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
categoryController.updateCategory.bind(categoryController));
router.delete("/delete/:id",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin","worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
categoryController.deleteCategory.bind(categoryController));

module.exports = { router };
