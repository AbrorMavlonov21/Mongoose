const { CustomError } = require("../lib/customError");

class RoleMiddleware {
  checkRole(req, res, next) {
    try {
      const roles = req.roles;
      const currentUser = req.currentUser;

      if (roles && roles.length) {
        if (!currentUser) {
          throw new CustomError(500, "currentUser is not provided!");
        }

        const isExist = roles.includes(currentUser.role);

        if (!isExist) {
          throw new CustomError(403, "Forbidden");
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}

const roleMiddleware = new RoleMiddleware();

module.exports = { roleMiddleware };
