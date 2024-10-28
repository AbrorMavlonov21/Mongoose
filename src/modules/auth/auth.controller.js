const { CustomError } = require("../../lib/customError");
const { userService } = require("../../modules/user/user.service");
const { myHashing } = require("../../lib/bcrypt");
const { authService } = require("../auth/auth.service");
const { authSchema } = require("../dto/auth.dto");

const { validate } = require("uuid");

class AuthController {
    #authService;
    #userService
    constructor(authService, userService) {

        this.#authService = authService;
        this.#userService = userService;
        
    }
    async login(req, res, next){
        try { 

       const dto = req.body;
        validate(authSchema, dto);

        const { data: foundUserByLogin } = await this.#userService.getByLogin(
        dto.login
      );

      if (!foundUserByLogin) {
        throw new CustomError(400, "login or password wrong!");
      }

      const isValidate = await myHashing.isValidate(
        dto.password,
        foundUserByLogin.password
      );

      if (!isValidate) {
        throw new CustomError(400, "login or password wrong!");
      }

      const resData = this.#authService.generateToken(foundUserByLogin);

      res.status(resData.status).json(resData);

            
        } catch (error) {
            next(error);
            
        }
    }
    async register(req, res, next){
        try {
            const dto = req.body;
            validate(authSchema, dto);

       const foundUserByLogin = await this.#userService.getByLogin(
        dto.login
      );

      if (foundUserByLogin.data) {
        throw new CustomError(400, "login already exist");
      }
        const {data: hashedPassword} = await this.#authService.register(dto.password);
        dto.password = hashedPassword;
        dto.role = "client";


        const resData = await this.#userService.createUser(dto);

        res.status(resData.status).json(resData);

        } catch (error) {
            next(error);
            
        }
    }
}

const authController = new AuthController(authService, userService);

module.exports = { authController };