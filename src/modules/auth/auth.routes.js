const { Router } = require("express");
const { authController } = require("../../modules/auth/auth.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");


const router = Router();

router.post("/login", authController.login.bind(authController));
router.post("/reg", authController.register.bind(authController));
router.post("/check", authController.refTokenCheck.bind(authController));
router.post("/reset-password", authController.resetPassword.bind(authController));
router.post("/verify", 
    authMiddleware.checkTokenResetPassword.bind(authMiddleware),
    authController.verifyPassword.bind(authController)
);
router.post("/change-password", 
    authMiddleware.checkTokenResetPassword.bind(authMiddleware),
    authController.changePassword.bind(authController)
);  


module.exports = { router }

