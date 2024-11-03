const { Router } = require("express");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { roleMiddleware } = require("../../middlewares/role.middleware");
const { setRole } = require("../../lib/setRole");
const { korzinkaProductController } = require("../korzinkaProduct/korzinkaProduct.controller")


const router = Router();

router.get("/", korzinkaProductController.getAll.bind(korzinkaProductController));
router.post("/create",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
korzinkaProductController.createKorzinkaProduct.bind(korzinkaProductController));

router.put("/update/:id",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
korzinkaProductController.updateKorzinkaProduct.bind(korzinkaProductController));
router.delete("/delete/:id", 
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
korzinkaProductController.deleteKorzinkaProduct.bind(korzinkaProductController));

module.exports = { router };