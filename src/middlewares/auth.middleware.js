const { CustomError } = require("../lib/customError");
const { myJwt } =require("../lib/jwt")
const { userService } = require("../modules/user/user.service");

class AuthMiddleware {
  #jwt;
  #userService;
  constructor(jwt, userService) {
    this.#jwt = jwt;
    this.#userService = userService;
  }

  checkToken(req, res, next) {
    try {
      const myHeader = req.headers.authorization;

      if (!myHeader || !myHeader.startsWith('Bearer ')) {
    throw new CustomError(401, "Authorization header with Bearer token is required");
}

      const token = myHeader.split(' ')[1];
      
      if (!token) {
        throw new CustomError(401, "token must be required!");
      }

      const { id } = this.#jwt.verify(token);

      req.userId = id;
      next();
    }catch(error){
        error.status = 401;
      next(error);

    }
}
async checkUser(req, res, next) {
    try {
      const userId = req.userId;
      if (!userId) {
        throw new CustomError(500, "userId not provided!");
      }

      const { data } = await this.#userService.getById(userId);

      req.currentUser = data;

      next();
    }catch(error){
        next(error);
    }
}
async  checkTokenResetPassword(req, res, next) {
    try {
      const myHeader = req.headers.authorization;

      if (!myHeader || !myHeader.startsWith('Bearer ')) {
    throw new CustomError(401, "Authorization header with Bearer token is required");
}

      const token = myHeader.split(' ')[1];
      
      if (!token) {
        throw new CustomError(401, "token must be required!");
      }

      const { id } = this.#jwt.verifyResetPassword(token);

      const {data} = await this.#userService.getById(id);

      req.currentUser = data
      next();
    }catch(error){
        error.status = 401;
      next(error);

    }
}
}

const authMiddleware = new AuthMiddleware(myJwt, userService);

module.exports = { authMiddleware };