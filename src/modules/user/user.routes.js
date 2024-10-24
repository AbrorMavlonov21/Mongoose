const { Router } = require("express");
const { userController } = require("../user/user.controller");

const router = Router();

router.get("/", userController.getAll.bind(userController));
router.post("/create", userController.createUser.bind(userController));
router.put("/update/:id", userController.updateUser.bind(userController));
router.delete("/delete/:id", userController.deleteUser.bind(userController));

module.exports = { router };