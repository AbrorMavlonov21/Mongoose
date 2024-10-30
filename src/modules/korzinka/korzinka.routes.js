const { Router } = require("express");
const { korzinkaController } = require("../korzinka/korzinka.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { roleMiddleware } = require("../../middlewares/role.middleware");
const { setRole } = require("../../lib/setRole");


const router = Router();

router.get("/", korzinkaController.getAll.bind(korzinkaController));
router.post("/create",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
korzinkaController.createKorzinka.bind(korzinkaController));
router.put("/update/:id",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
korzinkaController.updateKorzinka.bind(korzinkaController));
router.delete("/delete/:id", 
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "worker", "manager","client"),
roleMiddleware.checkRole.bind(roleMiddleware),
korzinkaController.deleteKorzinka.bind(korzinkaController));

module.exports = { router };