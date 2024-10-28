const { Router } = require("express");
const { authController } = require("../../modules/auth/auth.controller")

const router = Router();

router.post("/login", authController.login.bind(authController));
router.post("/reg", authController.register.bind(authController));


module.exports = { router }

