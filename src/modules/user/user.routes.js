const { Router } = require("express");
const { userController } = require("../user/user.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { roleMiddleware } = require("../../middlewares/role.middleware");
const { setRole } = require("../../lib/setRole");


const router = Router();

router.get("/", userController.getAll.bind(userController));
router.post("/create", 
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin"),
roleMiddleware.checkRole.bind(roleMiddleware),
userController.createUser.bind(userController));
router.put("/update/:id", 
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin","manager"),
roleMiddleware.checkRole.bind(roleMiddleware),
userController.updateUser.bind(userController));
router.delete("/delete/:id",
authMiddleware.checkToken.bind(authMiddleware),
authMiddleware.checkUser.bind(authMiddleware),
setRole("admin", "manager"),
roleMiddleware.checkRole.bind(roleMiddleware),
userController.deleteUser.bind(userController));

module.exports = { router };